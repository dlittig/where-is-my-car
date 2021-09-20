import React, { FC } from "react";
import { Text } from "@ui-kitten/components";

import style from "./Field.style";
import { FieldComponentType } from "./types";

const Field: FC<FieldComponentType> = ({ description, content }) => (
  <>
    <Text style={style.sectionLabel} category="s1">
      {description}
    </Text>
    {typeof content === "string" && content.length > 0 && (
      <Text style={style.description} appearance="hint">
        {content}
      </Text>
    )}
  </>
);

export default Field;
