import { FC, useRef, useState } from "react";
import { View } from "react-native";
import {
  Modal,
  Portal,
  RadioButton,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";

import { UnitInputComponentType } from "./types";
import { paymentUnits, PaymentUnitType } from "../../store/types";

import styles from "./UnitInput.styles";

const UnitInput: FC<UnitInputComponentType> = ({ onChange, value }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text variant="bodyLarge" style={styles.modalTitle}>
            Choose currency
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => onChange(newValue as PaymentUnitType)}
            value={value}
          >
            {paymentUnits.map((currency, index) => (
              <RadioButton.Item
                key={`currency-item-${index}`}
                label={currency}
                value={currency}
              />
            ))}
          </RadioButton.Group>
        </Modal>
      </Portal>

      <TouchableRipple onPress={() => setVisible(true)}>
        <TextInput
          mode="outlined"
          editable={false}
          value={value}
          right={<TextInput.Icon icon="chevron-down" />}
        />
      </TouchableRipple>
    </View>
  );
};

export default UnitInput;
