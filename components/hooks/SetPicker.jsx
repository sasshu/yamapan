import React from "react";
import { Picker } from "@react-native-picker/picker";

// Picker作成
// 引数：数値配列
export const SetPicker = (props) => {
  return props.map((element, index) => (
    <Picker.Item key={index} label={`${element}`} value={element} />
  ));
};
