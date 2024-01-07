import React from "react";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { List, Button as PaperButton, Divider } from "react-native-paper";

import {
  randomEmoji,
  requestImagePickerPermission,
  showToast,
} from "../../utils";
import pack from "../../../package.json";
import { setSeenIntro } from "../../store/actions";
import BackBar from "../../components/Navigator/Bars/BackBar";
import { resetState } from "../../store/actions/commonActions";
import BaseLayout from "../../components/BaseLayout/BaseLayout";

const Settings = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <BackBar title={t("screens.settings")} />
      <BaseLayout>
        <List.Section>
          <List.Item
            title={t("text.settings.intro.title")}
            description={t("text.settings.intro.description")}
            right={(props) => (
              <PaperButton
                mode="outlined"
                onPress={() => {
                  dispatch(setSeenIntro(false));
                }}
                {...props}
              >
                {t("actions.start")}
              </PaperButton>
            )}
          />
          <List.Item
            title={t("text.settings.about.title")}
            description={t("text.settings.about.description")}
            right={(props) => (
              <PaperButton
                mode="outlined"
                onPress={() => {
                  showToast(`${randomEmoji()} Version: v${pack.version}`);
                }}
                {...props}
              >
                {t("actions.version")}
              </PaperButton>
            )}
          />
          <List.Item
            title={t("text.settings.mediaPermission.title")}
            description={t("text.settings.mediaPermission.description")}
            right={(props) => (
              <PaperButton
                mode="outlined"
                onPress={() => {
                  requestImagePickerPermission();
                }}
                {...props}
              >
                {t("actions.grantPermission")}
              </PaperButton>
            )}
          />
        </List.Section>
        {__DEV__ && (
          <>
            <Divider />
            <List.Section>
              <List.Subheader>Development</List.Subheader>
              <List.Item
                title="Reset"
                description="Delete all state data"
                right={(props) => (
                  <PaperButton
                    mode="outlined"
                    onPress={() => {
                      dispatch(resetState());
                    }}
                    {...props}
                  >
                    {t("actions.reset")}
                  </PaperButton>
                )}
              />
            </List.Section>
          </>
        )}
      </BaseLayout>
    </>
  );
};

export default Settings;
