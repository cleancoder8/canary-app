#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import {CanaryAppStack} from '../lib/canary-app-stack';

const app = new cdk.App();
new CanaryAppStack(app, 'CanaryAppStack');
app.synth()
