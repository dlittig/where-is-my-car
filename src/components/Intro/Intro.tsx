import React, { FC, useEffect, useState } from "react";

import { View } from "react-native";
import { useSelector } from "react-redux";
import { Button, Layout, TopNavigation } from "@ui-kitten/components";

import {
  StepDescription,
  StepLaunch,
  StepLocation,
  StepMediaLibrary,
  StepNotification,
} from "./steps";
import Icons from "../Icons";
import style from "./Intro.style";
import MainAction from "../MainAction";
import { settingsLocationPermissionSelector } from "../../store/selectors";
import { useTranslation } from "react-i18next";

const Intro: FC = () => {
  const locationPermission = useSelector(settingsLocationPermissionSelector);
  const [stepLocks, setStepLocks] = useState<number[]>([]);
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  const steps = [
    <StepDescription
      currentStep={step}
      setStepLocks={setStepLocks}
      stepLocks={stepLocks}
    />,
    <StepLocation
      currentStep={step}
      setStepLocks={setStepLocks}
      stepLocks={stepLocks}
    />,
    <StepNotification
      currentStep={step}
      setStepLocks={setStepLocks}
      stepLocks={stepLocks}
    />,
    <StepMediaLibrary
      currentStep={step}
      setStepLocks={setStepLocks}
      stepLocks={stepLocks}
    />,
    <StepLaunch
      currentStep={step}
      setStepLocks={setStepLocks}
      stepLocks={stepLocks}
    />,
  ];
  const maxSteps = 5;
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

  useEffect(() => {
    // Check if permissions are there already
    // (for example if revisiting the tour)

    if (!locationPermission && !stepLocks.includes(2)) {
      setStepLocks([...stepLocks, 2, 3]);
    }
  }, []);

  return (
    <Layout style={style.screen} level="1">
      <TopNavigation
        alignment="center"
        title={t("screens.app") as string}
        subtitle={t("screens.intro") as string}
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
            {t("actions.previous") as string}
          </Button>
          <Button
            style={style.mainActionButton}
            accessoryRight={Icons.Next}
            onPress={stepForward}
            appearance="outline"
            disabled={step === maxSteps || stepLocks.includes(step)}
          >
            {t("actions.next") as string}
          </Button>
        </View>
      </MainAction>
    </Layout>
  );
};

export default Intro;
