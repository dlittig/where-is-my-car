import React, { Dispatch } from "react";

import { useDispatch } from "react-redux";
import { Button, Divider, List, ListItem } from "@ui-kitten/components";

import { SettingsEntryType } from "./types";
import { setSeenIntro } from "../../store/actions";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import BackBar from "../../components/Navigator/Bars/BackBar/BackBar";
import { resetState } from "../../store/actions/commonActions";
import { useTranslation } from "react-i18next";

const renderItem =
  (dispatch: Dispatch<any>) =>
  ({ item, index }: { item: SettingsEntryType; index: number }) =>
    (
      <ListItem
        title={item.title}
        description={item.description}
        accessoryRight={() =>
          item.button ? (
            <Button
              size="small"
              appearance="outline"
              onPress={item.button.onPress(dispatch)}
            >
              {item.button.label}
            </Button>
          ) : (
            <></>
          )
        }
      />
    );

const Settings = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const settingsEntries: SettingsEntryType[] = [
    {
      title: t("text.settings.intro.title"),
      description: t("text.settings.intro.description"),
      button: {
        onPress: (dispatch) => () => {
          dispatch(setSeenIntro(false));
        },
        label: t("actions.start"),
      },
    },
  ];

  if (__DEV__) {
    settingsEntries.push({
      title: "[DEBUG] Reset",
      description: "Delete all state data",
      button: {
        onPress: (dispatch) => () => {
          dispatch(resetState());
        },
        label: t("actions.reset"),
      },
    });
  }

  return (
    <>
      <BackBar title={t("screens.settings")} />
      <BaseLayout level="1">
        <List
          data={settingsEntries}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem(dispatch)}
        />
      </BaseLayout>
    </>
  );
};

export default Settings;
