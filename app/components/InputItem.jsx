import React from "react";
import { Text, TextInput, View } from "react-native";

// Author: Trieu
// This component is used to display a single input item
const InputItem = ({
  title,
  value,
  ref,
  onChangeText,
  editable = true,
  secureTextEntry = false,
}) => {
  return (
    <View className="mb-3">
      <Text className="text-xs mb-[2px] ml-1">{title}</Text>
      <TextInput
        ref={ref}
        placeholder={`Enter ${title}`}
        className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default InputItem;
