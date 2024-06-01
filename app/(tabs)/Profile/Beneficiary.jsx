import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { BeneficiaryItem, InputModal } from "../../components";
import { useFocusEffect } from "@react-navigation/native";
import { BeneficiaryService } from "../../services";
import { useAuth } from "../../hooks";
import { router } from "expo-router";
import { useNotification } from "../../hooks";
import { Notification } from "../../components";

const Beneficiary = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInputModalVisibal, setIsInputModalVisible] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const { notification, showNotification } = useNotification();
  const [formBeneficiary, setFormBeneficiary] = useState({
    account_number: "",
    name: "",
  });

  const { insertBeneficiary, getBeneficiariesByCustomerId, deleteBeneficiary } =
    BeneficiaryService();
  const { customerId } = useAuth();

  const fetchBeneficiaries = async () => {
    try {
      const response = await getBeneficiariesByCustomerId(customerId);
      if (
        !response ||
        !response.data ||
        !response.data.result ||
        !response.data.result.beneficiaries
      ) {
        // Beneficiaries data is null or undefined, return early
        return;
      }
      setBeneficiaries(response.data.result.beneficiaries);
    } catch (error) {
      console.error("Failed to fetch beneficiaries:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBeneficiaries();
    }, [customerId])
  );

  const toggleModal = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setIsModalVisible(!isModalVisible);
  };

  const handleMakeTransaction = () => {
    if (selectedBeneficiary) {
      router.push({
        pathname: `/Transfer`,
        params: { accountNumber: selectedBeneficiary.account_number },
      });
      setIsModalVisible(false);
    }
  };

  const handleInsertBeneficiary = async () => {
    try {
      await insertBeneficiary({
        customer_id: customerId,
        account_number: formBeneficiary.account_number,
        name: formBeneficiary.name,
      });
      showNotification(
        `Inserted beneficiary ${formBeneficiary.name} successfully`,
        "success"
      );
      fetchBeneficiaries(); // Refetch the list of beneficiaries
      setFormBeneficiary({ account_number: "", name: "" });
      setIsInputModalVisible(false);
    } catch (error) {
      setIsInputModalVisible(false);
      showNotification(error.message, "error"); // Show the backend error message
    }
  };

  const handleDeleteBenificiary = async () => {
    if (selectedBeneficiary) {
      await deleteBeneficiary(selectedBeneficiary.id);
      showNotification(
        `Deleted beneficiary ${selectedBeneficiary.name} successfully`,
        "success"
      );

      setBeneficiaries((prevBeneficiaries) =>
        prevBeneficiaries.filter((b) => b.id !== selectedBeneficiary.id)
      ); // Update state to remove the deleted beneficiary
    }
    setIsModalVisible(false);
  };

  return (
    <>
      <ScrollView className="pt-5 bg-gray-200 px-2">
        <View className="absolute top-[-70px] self-center">
          {notification.type && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}
        </View>
        <Text className="mb-3">Interbank Transfer To Accounts</Text>
        <View className="w-full mb-5 bg-slate-50 px-2 pb-8 justify-center rounded-md">
          {beneficiaries && beneficiaries.length > 0 ? (
            beneficiaries.map((beneficiary) => (
              <TouchableOpacity
                onPress={() => toggleModal(beneficiary)}
                key={beneficiary.id}
              >
                <BeneficiaryItem
                  name={beneficiary.name}
                  accountNumber={beneficiary.account_number}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No beneficiaries found</Text>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setIsInputModalVisible(!isInputModalVisibal)}
      >
        <View className="w-12 h-12 absolute bottom-8 right-4 bg-black rounded-full justify-center items-center">
          <FontAwesomeIcon icon={faPlus} size={18} color="white" />
        </View>
      </TouchableOpacity>

      {selectedBeneficiary && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => toggleModal(null)}
        >
          <View
            className="flex-1 justify-end"
            style={{ backgroundColor: "rgba(1, 1, 1, 0.7)" }}
          >
            <View className="bg-slate-50 rounded-md p-5">
              <View className="flex flex-row justify-between mb-5">
                <Text className="font-bold">Beneficiary Detail</Text>
                <TouchableOpacity onPress={() => toggleModal(null)}>
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
                    <Text className="font-bold">
                      {selectedBeneficiary.account_number}
                    </Text>
                    <Text className="font-bold">
                      {selectedBeneficiary.name}
                    </Text>
                    <Text className="font-bold">TDK Banking</Text>
                    <Text className="font-bold">Interbank Transfer</Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black mb-4"
                    onPress={handleMakeTransaction}
                  >
                    <Text className="text-center text-slate-50 font-bold">
                      Make Transaction
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDeleteBenificiary}
                    className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-slate-300 mb-4"
                  >
                    <Text className="text-center text-black font-bold">
                      Delete Beneficiary
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}

      <InputModal
        isVisible={isInputModalVisibal}
        onClose={() => setIsInputModalVisible(false)}
        onSubmit={handleInsertBeneficiary}
        inputs={[
          {
            title: "Account Number",
            value: formBeneficiary.account_number,
            onChangeText: (value) =>
              setFormBeneficiary((prevForm) => ({
                ...prevForm,
                account_number: value,
              })),
          },
          {
            title: "Name",
            value: formBeneficiary.name,
            onChangeText: (value) =>
              setFormBeneficiary((prevForm) => ({
                ...prevForm,
                name: value,
              })),
          },
        ]}
      />
    </>
  );
};

export default Beneficiary;
