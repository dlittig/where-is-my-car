import React, { FC } from "react";
import { Button, Icon } from "@ui-kitten/components";
import { showLocation } from "react-native-map-link";

import style from "./Footer.style";

const NavigationIcon = (props: any) => (
  <Icon {...props} name="navigation-outline" />
);

const StopIcon = (props: any) => <Icon {...props} name="slash-outline" />;

const shareLocation = (latitude: number, longitude: number) => {
  showLocation({
    latitude,
    longitude,
    dialogTitle: "Navigate to your parking", // optional (default: 'Open in Maps')
    dialogMessage: "What app would you like to use?", // optional (default: 'What app would you like to use?')
    cancelText: "Cancel", // optional (default: 'Cancel')
    naverCallerName: "de.dlittig.whereismycar", // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
  });
};

const ParkingCardFooter: FC<ParkingCardFooterComponentType> = ({
  longitude,
  latitude,
}) => (
  <>
    <Button
      style={style.button}
      size="small"
      appearance="outline"
      accessoryLeft={NavigationIcon}
      onPress={() => shareLocation(latitude, longitude)}
    >
      Navigate to...
    </Button>
    <Button
      style={style.button}
      size="small"
      appearance="outline"
      accessoryLeft={StopIcon}
      onPress={() => {}}
    >
      Stop parking
    </Button>
  </>
);

export default ParkingCardFooter;
