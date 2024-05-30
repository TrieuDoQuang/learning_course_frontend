import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { BeneficiaryItem } from "../../components";

const Beneficiary = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <ScrollView className="pt-5 bg-gray-200 px-2">
        <Text className="mb-3">Interbank Transfer To Accounts</Text>
        <View className="w-full mb-5 bg-slate-50 px-2 pb-8 justify-center rounded-md">
          <TouchableOpacity onPress={toggleModal}>
            <BeneficiaryItem name="Do Quang Trieu" accountNumber="8972668719" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <BeneficiaryItem name="Do Quang Trieu" accountNumber="8972668719" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <BeneficiaryItem name="Do Quang Trieu" accountNumber="8972668719" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity>
        <View className="w-12 h-12 absolute bottom-8 right-4 bg-black rounded-full justify-center items-center">
          <FontAwesomeIcon icon={faPlus} size={18} color="white" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(1, 1, 1, 0.7)" }}
        >
          <View className="bg-slate-50 rounded-md p-5">
            <View className="flex flex-row justify-between mb-5">
              <Text className="font-bold">Beneficiary Detail</Text>
              <TouchableOpacity onPress={toggleModal}>
                <FontAwesomeIcon icon={faClose} size={16} />
              </TouchableOpacity>
            </View>
            <View className="grid gap-52">
              <View className="flex-row justify-between">
                <View className="gap-3 text-gray-300">
                  <Text>Beneficiary Number</Text>
                  <Text>Beneficiary Name</Text>
                  <Text>Beneficiary Bank</Text>
                  <Text>Transfer Type</Text>
                </View>
                <View className="gap-3">
                  <Text className="font-bold">3059441</Text>
                  <Text className="font-bold">Do Quang Trieu</Text>
                  <Text className="font-bold">TDK Banking</Text>
                  <Text className="font-bold">Interbank Transfer</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black mb-4">
                  <Text className="text-center text-slate-50 font-bold">
                    Make Transaction
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-slate-300 mb-4">
                  <Text className="text-center text-black font-bold">
                    Delete Beneficiary
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Beneficiary;
