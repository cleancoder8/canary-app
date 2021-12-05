import * as ssm from '@aws-cdk/aws-ssm'
import * as cdk from '@aws-cdk/core';

export class CanaryAppStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new ssm.StringParameter(this, "ssm-parameter", {
            allowedPattern: '.*',
            description: 'The value Foo',
            parameterName: 'FooParameter',
            stringValue: 'Foo',
            tier: ssm.ParameterTier.ADVANCED,
        })
    }
}
