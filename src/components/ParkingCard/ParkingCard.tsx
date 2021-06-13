import { Text } from "@ui-kitten/components";
import React, { FC } from "react";
import BaseCard from "../BaseCard";
import { CARD_TYPE } from "../BaseCard/types";
import { ParkingCardComponentType } from "./types";

const ParkingCard: FC<ParkingCardComponentType> = ({ parking }) => (
  <BaseCard type={CARD_TYPE.INFO}>
    <BaseCard.Content>
      <Text>Location</Text>
    </BaseCard.Content>
  </BaseCard>
);

export default ParkingCard;
