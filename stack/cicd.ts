import {Stack, StackProps, Stage, StageProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import * as ppl from "aws-cdk-lib/pipelines";
import { Infra } from './infra';

export class Cicd extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const input = ppl.CodePipelineSource.connection("cfchou/cf220311_cdk_ts", "main", {
      connectionArn: "arn:aws:codestar-connections:ap-southeast-1:897882544000:connection/183630a4-d3f9-4ba3-943e-a025872036a1",
      // allow submodule
      // codeBuildCloneOutput: true,
    });
    const synth = new ppl.CodeBuildStep("Build", {
      input,
      projectName: "cf220311-build",
      env: {
        MY_ENV: "FOOBAR",
      },
      installCommands: [
        "npm install",
      ],
      commands: [
        "npx cdk synth",
      ],
      primaryOutputDirectory: "cdk.out",
    });
    const pipeline = new ppl.CodePipeline(this, "Pipeline", {
      pipelineName: "cf220311-cicd",
      synth,
      dockerEnabledForSynth: true,
      crossAccountKeys: false,
    });
    pipeline.addStage(new InfraStage(this, "Stage"))
  }
}

class InfraStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    new Infra(this, "Stack", {
      stackName: "cf220311-infra",
    })
  }
}

