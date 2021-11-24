import * as cdk from '@aws-cdk/core';
import * as pipelines from '@aws-cdk/pipelines';

export class CanaryPipelineStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
            synth: new pipelines.ShellStep('Synth', {
                input: pipelines.CodePipelineSource.connection('my-org/my-app', 'main', {
                    connectionArn: 'arn:aws:codestar-connections:us-east-1:063764846672:connection/5707fe66-2532-411b-82ed-e52992e827e3',
                }),
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth',
                ],
            }),
        });

        // 'MyApplication' is defined below. Call `addStage` as many times as
        // necessary with any account and region (may be different from the
        // pipeline's).
        pipeline.addStage(new MyApplication(this, 'Prod', {
            env: {
                account: '123456789012',
                region: 'eu-west-1',
            },
        }));
    }
}
