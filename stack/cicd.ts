import {Stack, StackProps, Stage, StageProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import * as ppl from "aws-cdk-lib/pipelines";
import { Infra } from './infra';

export class Cicd extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const synth = new ppl.CodeBuildStep("Build", {
      projectName: "cf220311-build",
      env: {
        MY_ENV: "FOOBAR",
      },
      installCommands: [
        "npm install -g aws-cdk",
      ],
      commands: [
        "cdk synth",
      ],
      primaryOutputDirectory: "cdk.out",
    });
    const pipeline = new ppl.CodePipeline(this, "Pipeline", {
      pipelineName: "cf220311-cicd",
      synth,
      dockerEnabledForSynth: true,
      crossAccountKeys: false,
    });
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

