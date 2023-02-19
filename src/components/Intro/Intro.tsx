import React, { FC, useEffect, useState } from "react";

import { View } from "react-native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Appbar, Button } from "react-native-paper";

import {
  StepDescription,
  StepLaunch,
  StepLocation,
  StepMediaLibrary,
  StepNotification,
} from "./steps";
import style from "./Intro.style";
import MainAction from "../MainAction";
import BaseLayout from "../BaseLayout";
import { settingsLocationPermissionSelector } from "../../store/selectors";

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

  // style={style.screen}
  return (
    <BaseLayout style={style.mainView}>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title={t("screens.app") as string} />
      </Appbar.Header>

      {steps[step - 1]}

      <MainAction>
        <View style={style.mainAction}>
          <Button
            style={style.mainActionButton}
            icon="chevron-left"
            onPress={stepBackward}
            mode="contained-tonal"
            disabled={step === 1}
          >
            {t("actions.previous") as string}
          </Button>
          <Button
            style={style.mainActionButton}
            icon="chevron-right"
            contentStyle={{
              flexDirection: "row-reverse",
            }}
            onPress={stepForward}
            mode="contained-tonal"
            disabled={step === maxSteps || stepLocks.includes(step)}
          >
            {t("actions.next") as string}
          </Button>
        </View>
      </MainAction>
    </BaseLayout>
  );
};

export default Intro;
