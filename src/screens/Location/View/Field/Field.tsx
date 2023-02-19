import React, { FC } from "react";
import { Text } from "react-native-paper";

import style from "./Field.style";
import { FieldComponentType } from "./types";

const Field: FC<FieldComponentType> = ({ description, content }) => (
  <>
    <Text style={style.sectionLabel} variant="titleMedium">
      {description}
    </Text>
    {typeof content === "string" && content.length > 0 && (
      <Text style={style.description} variant="bodyMedium">
        {content}
      </Text>
    )}
  </>
);

export default Field;
