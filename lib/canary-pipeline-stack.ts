import * as cdk from '@aws-cdk/core';
import * as pipelines from '@aws-cdk/pipelines';
import {CanaryAppStack} from "./canary-app-stack";

export class CanaryPipelineStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
            synth: new pipelines.ShellStep('Synth', {
                input: pipelines.CodePipelineSource.connection('my-org/my-app', 'main', {
                    connectionArn: '',
                }),
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth',
                ],
            }),
        });
    }
}
