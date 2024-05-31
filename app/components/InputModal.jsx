import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import InputItem from "./InputItem";

const InputModal = ({ isVisible, onClose, onSubmit, inputs }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View style={{ backgroundColor: "white", padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Add Beneficiary</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesomeIcon icon={faClose} size={16} />
            </TouchableOpacity>
          </View>
          {inputs.map((input, index) => (
            <InputItem
              key={index}
              title={input.title}
              value={input.value}
              onChangeText={input.onChangeText}
            />
          ))}
          <TouchableOpacity
            style={{
              height: 48,
              borderWidth: 2,
              borderColor: "gray",
              borderRadius: 24,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              marginTop: 10,
            }}
            onPress={onSubmit}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Insert Beneficiary
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;
