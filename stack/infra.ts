import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
//import * as lx from 'aws-cdk-lib/aws-lambda';
import * as lx_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from "path";

export class Infra extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dummyFn = new lx_nodejs.NodejsFunction(this, 'dummy', {
      functionName: 'dummy-handler',
      handler: 'main',
      entry: path.join(__dirname, '/../src/dummy.ts'),
      bundling: {
        forceDockerBundling: true,
      }
    });
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'Cf220311CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
