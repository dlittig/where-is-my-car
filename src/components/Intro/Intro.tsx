import { Button, Layout, Text, TopNavigation } from "@ui-kitten/components";
import React, { FC } from "react";
import { useState } from "react";
import { View } from "react-native";
import BaseLayout from "../BaseLayout";
import Icons from "../Icons";
import MainAction from "../MainAction";

import style from "./Intro.style";
import {
  StepDescription,
  StepLaunch,
  StepLocation,
  StepMediaLibrary,
} from "./steps";

const steps = [
  <StepDescription />,
  <StepLocation />,
  <StepMediaLibrary />,
  <StepLaunch />,
];

const Intro: FC = () => {
  const [step, setStep] = useState(1);
  const maxSteps = 4;
  const stepForward = () => {
    if (step < maxSteps) {
      setStep(step + 1);
    }
  };
  const stepBackward = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Layout style={style.screen} level="1">
      <TopNavigation
        alignment="center"
        title="Yo where is my car?"
        subtitle="Introduction"
      />
      {steps[step - 1]}

      <MainAction>
        <View style={style.mainAction}>
          <Button
            style={style.mainActionButton}
            accessoryLeft={Icons.Previous}
            onPress={stepBackward}
            appearance="outline"
            disabled={step === 1}
          >
            Previous
          </Button>
          <Button
            style={style.mainActionButton}
            accessoryRight={Icons.Next}
            onPress={stepForward}
            appearance="outline"
            disabled={step === maxSteps}
          >
            Next
          </Button>
        </View>
      </MainAction>
    </Layout>
  );
};

export default Intro;
