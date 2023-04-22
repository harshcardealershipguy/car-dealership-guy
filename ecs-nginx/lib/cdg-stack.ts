import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {LinuxParameters, LogDriver, Secret} from "aws-cdk-lib/aws-ecs";
import {Effect, Policy, PolicyStatement} from "aws-cdk-lib/aws-iam";
import {Secret as SecretManager} from 'aws-cdk-lib/aws-secretsmanager';
import {IVpc} from "aws-cdk-lib/aws-ec2";
import {
  ApplicationLoadBalancedFargateService
} from "aws-cdk-lib/aws-ecs-patterns/lib/fargate/application-load-balanced-fargate-service";

export class CdgStack extends cdk.Stack {
  config : any;
  env : string;


  constructor(scope: Construct, env: string, stackId: string, config: any, props?: cdk.StackProps) {
    super(scope, stackId, props);

    this.config = config;
    this.env = env;

    const vpc = this.createVpc();
    const taskIamRole = this.createTaskIamRole();
    const linuxParameters = new LinuxParameters(this, 'linux_params', {initProcessEnabled: true})
    this.createBackendService(scope, vpc, taskIamRole, linuxParameters);
    this.createFrontendService(scope, vpc, taskIamRole, linuxParameters);
  }

  createVpc() {
    //TODO: should this not be the default VPC?
    // Look up the default VPC
    const vpc = ec2.Vpc.fromLookup(this, "VPC", {
      isDefault: true
    });
    return vpc;
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
      APP_KEY: Secret.fromSecretsManager(secrets, 'APP_KEY')
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

    const albFargateService : ApplicationLoadBalancedFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, this.stackName + '-' + NAME_PREFIX + "-service", {
      vpc: vpc,
      taskDefinition: taskDefinition,
      desiredCount: 1,
      serviceName: this.stackName + '-' + NAME_PREFIX + "-service",
      assignPublicIp: true,
      publicLoadBalancer: true,
      enableExecuteCommand: true
    });

    albFargateService.loadBalancer
  }

  createFrontendService (scope: Construct, vpc : IVpc, taskIamRole: cdk.aws_iam.Role, linuxParameters : LinuxParameters) {
    const NAME_PREFIX = 'frontend';

    const taskDefinition = new ecs.FargateTaskDefinition(this, this.stackName + '-' + NAME_PREFIX + '-task-definition', {
      taskRole: taskIamRole,
      cpu: 256,
      memoryLimitMiB: 512
    });

    const logConfiguration = LogDriver.awsLogs({streamPrefix: NAME_PREFIX});

    taskDefinition.addContainer(this.stackName + '-' + NAME_PREFIX + '-container', {
      containerName: this.stackName + '-' + NAME_PREFIX + '-container',
      environment: this.config.frontendEnvironment,
      image: ecs.ContainerImage.fromAsset('../frontend'),
      portMappings: [{ containerPort: 80, hostPort: 80 }],
      memoryReservationMiB: 256,
      cpu: 256,
      logging: logConfiguration,
      linuxParameters: linuxParameters
    });

    //TODO: if possible add the scurity group of the service to the inbound of the security group of the DB
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, this.stackName + '-' +NAME_PREFIX + '-service', {
      vpc: vpc,
      taskDefinition: taskDefinition,
      desiredCount: 1,
      serviceName: this.stackName + '-' +NAME_PREFIX + '-service',
      assignPublicIp: true,
      publicLoadBalancer: true,
      enableExecuteCommand: true
    });
  }


}