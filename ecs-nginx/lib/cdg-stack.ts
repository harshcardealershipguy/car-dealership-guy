import * as ec2 from "aws-cdk-lib/aws-ec2";
import {IVpc, Peer, Port} from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import {FargateService, ICluster, LinuxParameters, LogDriver, Secret} from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Effect, Policy, PolicyStatement} from "aws-cdk-lib/aws-iam";
import {Secret as SecretManager} from 'aws-cdk-lib/aws-secretsmanager';
import {
  ApplicationLoadBalancedFargateService
} from "aws-cdk-lib/aws-ecs-patterns/lib/fargate/application-load-balanced-fargate-service";
import {ApplicationLoadBalancer, ApplicationProtocol} from "aws-cdk-lib/aws-elasticloadbalancingv2";
import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";

export class CdgStack extends cdk.Stack {
  config : any;
  env : string;
  cert : Certificate;
  cluster : ICluster;

  constructor(scope: Construct, env: string, stackId: string, config: any, props?: cdk.StackProps) {
    super(scope, stackId, props);

    this.config = config;
    this.env = env;

    const vpc = this.createVpc();
    this.createCert();
    const taskIamRole = this.createTaskIamRole();
    const linuxParameters = new LinuxParameters(this, 'linux_params', {initProcessEnabled: true})
    this.createBackendService(scope, vpc, taskIamRole, linuxParameters);
    this.createBackendQueueWorkerService(scope, vpc, taskIamRole, linuxParameters);
    this.createFrontendService(scope, vpc, taskIamRole, linuxParameters);
  }

  createVpc() {
    //TODO: should this not be the default VPC?
    // Look up the default VPC
    return ec2.Vpc.fromLookup(this, "VPC", {
      isDefault: true
    });
  }

  createCert() {
    this.cert = new Certificate(this, this.stackName + '-cert', {
      domainName: this.config.certificateDomain,
      validation: CertificateValidation.fromDns(),
      subjectAlternativeNames: [this.config.certificateAlternativeDomain]
    });
  }

  createTaskIamRole() : cdk.aws_iam.Role {
    const taskIamRole = new cdk.aws_iam.Role(this, this.stackName + '-role', {
      roleName: this.stackName + '-role',
      assumedBy: new cdk.aws_iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });

    const statement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "ssmmessages:CreateControlChannel",
        "ssmmessages:CreateDataChannel",
        "ssmmessages:OpenControlChannel",
        "ssmmessages:OpenDataChannel"
      ],
      resources: ['*']
    });

    const policy = new Policy(this, this.stackName + '-exec-role', {statements: [statement]});
    taskIamRole.attachInlinePolicy(policy);
    return taskIamRole;
  }

  createBackendQueueWorkerService(scope: Construct, vpc : IVpc, taskIamRole: cdk.aws_iam.Role, linuxParameters : LinuxParameters) {
    const NAME_PREFIX = 'backend-queue-worker';

    const taskDefinition = new ecs.FargateTaskDefinition(this, this.stackName + '-' + NAME_PREFIX + '-task-definition', {
      taskRole: taskIamRole,
      cpu: 256,
      memoryLimitMiB: 512
    });

    // SECRETS
    const secrets = SecretManager.fromSecretNameV2(this, this.stackName + '-' + NAME_PREFIX + '-secrets', this.config.awsSecretsManagerSecretName);

    const secretsEnvVars = {
      DB_USERNAME: Secret.fromSecretsManager(secrets, 'DB_USERNAME'),
      DB_PASSWORD: Secret.fromSecretsManager(secrets, 'DB_PASSWORD'),
      APP_KEY: Secret.fromSecretsManager(secrets, 'APP_KEY'),
      AWS_ACCESS_KEY_ID: Secret.fromSecretsManager(secrets, 'AWS_ACCESS_KEY_ID'),
      AWS_SECRET_ACCESS_KEY: Secret.fromSecretsManager(secrets, 'AWS_SECRET_ACCESS_KEY'),
    };

    const logConfiguration = LogDriver.awsLogs({streamPrefix: this.stackName + '-' + NAME_PREFIX});

    taskDefinition.addContainer(this.stackName + '-' + NAME_PREFIX +  '-container', {
      containerName: this.stackName + '-' + NAME_PREFIX + '-container',
      environment: this.config.backendQueueWorkerEnvironment,
      secrets: secretsEnvVars,
      image: ecs.ContainerImage.fromAsset('../backend'),
      memoryReservationMiB: 512,
      cpu: 256,
      logging: logConfiguration,
      linuxParameters: linuxParameters
    });

    const queueProcessingFargateService : FargateService = new FargateService(this, this.stackName + '-' + NAME_PREFIX + "-service", {
      taskDefinition: taskDefinition,
      serviceName: this.stackName + '-' + NAME_PREFIX + "-service",
      enableExecuteCommand: true,
      cluster: this.cluster,
      desiredCount: 1,
      assignPublicIp: true,
    });

    const rdsSecurityGroup = ec2.SecurityGroup.fromLookupByName(this, this.stackName + '-' + NAME_PREFIX + '-rds-security-group', 'RDS Security Group', vpc);
    rdsSecurityGroup.addIngressRule(Peer.securityGroupId(queueProcessingFargateService.connections.securityGroups[0].securityGroupId), Port.tcp(5432), '', true);
  }

  createBackendService(scope: Construct, vpc : IVpc, taskIamRole: cdk.aws_iam.Role, linuxParameters : LinuxParameters) {
    const NAME_PREFIX = 'backend';

    const taskDefinition = new ecs.FargateTaskDefinition(this, this.stackName + '-' + NAME_PREFIX + '-task-definition', {
      taskRole: taskIamRole,
      cpu: 512,
      memoryLimitMiB: 1024
    });

    // SECRETS
    const secrets = SecretManager.fromSecretNameV2(this, this.stackName + 'secrets', this.config.awsSecretsManagerSecretName);

    const secretsEnvVars = {
      DB_USERNAME: Secret.fromSecretsManager(secrets, 'DB_USERNAME'),
      DB_PASSWORD: Secret.fromSecretsManager(secrets, 'DB_PASSWORD'),
      APP_KEY: Secret.fromSecretsManager(secrets, 'APP_KEY'),
      AWS_ACCESS_KEY_ID: Secret.fromSecretsManager(secrets, 'AWS_ACCESS_KEY_ID'),
      AWS_SECRET_ACCESS_KEY: Secret.fromSecretsManager(secrets, 'AWS_SECRET_ACCESS_KEY'),
    };

    const logConfiguration = LogDriver.awsLogs({streamPrefix: this.stackName + '-' + NAME_PREFIX});

    taskDefinition.addContainer( this.stackName + '-nginx-container', {
      containerName: this.stackName + '-nginx-container',
      image: ecs.ContainerImage.fromAsset('../nginx'),
      portMappings: [{ containerPort: 80, hostPort: 80 }],
      memoryReservationMiB: 512,
      cpu: 256,
      logging: logConfiguration,
      linuxParameters: linuxParameters
    });

    taskDefinition.addContainer(this.stackName + '-backend-container', {
      containerName: this.stackName + '-backend-container',
      environment: this.config.backendEnvironment,
      secrets: secretsEnvVars,
      image: ecs.ContainerImage.fromAsset('../backend'),
      portMappings: [{ containerPort: 9000 }],
      memoryReservationMiB: 512,
      cpu: 256,
      logging: logConfiguration,
      linuxParameters: linuxParameters
    });

    const loadBalancer = new ApplicationLoadBalancer(this, this.stackName + '-' + NAME_PREFIX + '-load-balancer', {
      vpc,
      internetFacing: true
    });

    const albFargateService : ApplicationLoadBalancedFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, this.stackName + '-' + NAME_PREFIX + "-service", {
      vpc: vpc,
      taskDefinition: taskDefinition,
      desiredCount: 1,
      serviceName: this.stackName + '-' + NAME_PREFIX + "-service",
      assignPublicIp: true,
      publicLoadBalancer: true,
      enableExecuteCommand: true,
      loadBalancer: loadBalancer,
      certificate: this.cert
    });

    this.cluster = albFargateService.cluster;

    const rdsSecurityGroup = ec2.SecurityGroup.fromLookupByName(this, this.stackName + '-rds-security-group', 'RDS Security Group', vpc);
    rdsSecurityGroup.addIngressRule(Peer.securityGroupId(albFargateService.service.connections.securityGroups[0].securityGroupId), Port.tcp(5432), '', true);
  }

  createFrontendService (scope: Construct, vpc : IVpc, taskIamRole: cdk.aws_iam.Role, linuxParameters : LinuxParameters) {
    const NAME_PREFIX = 'frontend';

    const taskDefinition = new ecs.FargateTaskDefinition(this, this.stackName + '-' + NAME_PREFIX + '-task-definition', {
      taskRole: taskIamRole,
      cpu: 256,
      memoryLimitMiB: 512
    });

    const logConfiguration = LogDriver.awsLogs({streamPrefix: NAME_PREFIX});

    const image  = ecs.ContainerImage.fromAsset('../frontend', {buildArgs: {'FRONTEND_ENVIRONMENT_ARG': JSON.stringify(this.config.frontendEnvironment)}});

    taskDefinition.addContainer(this.stackName + '-' + NAME_PREFIX + '-container', {
      containerName: this.stackName + '-' + NAME_PREFIX + '-container',
      environment: this.config.frontendEnvironment,
      image,
      portMappings: [{ containerPort: 80 }],
      memoryReservationMiB: 256,
      cpu: 256,
      logging: logConfiguration,
      linuxParameters: linuxParameters
    });



    const loadBalancer = new ApplicationLoadBalancer(this, this.stackName + '-' + NAME_PREFIX + '-load-balancer', {
      vpc,
      internetFacing: true
    });

    //TODO: if possible add the scurity group of the service to the inbound of the security group of the DB
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, this.stackName + '-' +NAME_PREFIX + '-service', {
      vpc: vpc,
      taskDefinition: taskDefinition,
      desiredCount: 1,
      serviceName: this.stackName + '-' +NAME_PREFIX + '-service',
      assignPublicIp: true,
      publicLoadBalancer: true,
      enableExecuteCommand: true,
      protocol: ApplicationProtocol.HTTPS,
      redirectHTTP: true,
      loadBalancer: loadBalancer,
      certificate: this.cert

    });
  }


}