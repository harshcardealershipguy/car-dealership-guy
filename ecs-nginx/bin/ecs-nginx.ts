#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdgStack } from '../lib/cdg-stack';
import {Construct} from "constructs";
import * as fs from "fs";

const app = new cdk.App();
const env = getEnv(app);
const config = getConfig(app, env);
const stackName = env + '-cdg';
new CdgStack(app, env, stackName, config, {env: { account: '919311738224', region: 'us-east-1' }, stackName: stackName});


function getEnv(scope : Construct) {
  let env = scope.node.tryGetContext('profile');

  if(!env) {
    throw new Error('Error getting env');
  }
  return env;
}

function getConfig(scope : Construct, env: string) : any {
  let content = fs.readFileSync(`./configs/${env}.json`, "utf8");
  return JSON.parse(content);

}