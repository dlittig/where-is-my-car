import React, { Dispatch } from "react";

import { useDispatch } from "react-redux";
import { Button, Divider, List, ListItem } from "@ui-kitten/components";

import { SettingsEntryType } from "./types";
import { setSeenIntro } from "../../store/actions";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import BackBar from "../../components/Navigator/Bars/BackBar/BackBar";

const settingsEntries: SettingsEntryType[] = [
  {
    title: "Intro",
    description: "Show the intro screen again",
    button: {
      onPress: (dispatch) => () => {
        dispatch(setSeenIntro(false));
      },
      label: "Start",
    },
  },
];

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

  return (
    <>
      <BackBar title="Settings" />
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
