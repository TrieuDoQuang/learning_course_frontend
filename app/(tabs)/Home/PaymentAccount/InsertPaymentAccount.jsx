import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputItem } from "../../../components";
import { useState, useEffect } from "react";
import { useAuth, useNotification } from "../../../hooks";
import { Notification } from "../../../components";
import PaymentAccountService from "../../../services/PaymentAccountService";
const InsertPaymentAccount = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const { customerId } = useAuth();
  const { insertPaymentAccount } = PaymentAccountService();
  const { notification, showNotification } = useNotification();

  const setPaymentAccount = async () => {
    try {
      const response = await insertPaymentAccount(customerId, accountNumber);
      console.log("Add payment account successfully", response.data.result);
      showNotification("Add payment account successfully", "success");
      setAccountNumber("");
    } catch (error) {
      console.error("Failed to add payment account", error);
      showNotification("Failed to add payment account", "error");
    }
  };
  const handleChange = (text) => {
    const newText = text.replace(/[^0-9]/g, "");
    setAccountNumber(newText);
  };
  console.log("accountNumber", accountNumber);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <Text className="font-bold text-lg text-center">
              Add New Payment Account
            </Text>
          </View>
          <View className="p-3 my-4">
            <InputItem
              title="Account Number"
              value={accountNumber}
              //   onChangeText={(text) => {
              //     handleChange(text);
              //   }}
            />

            <TouchableOpacity
              className="bg-black p-3 rounded-lg mt-3"
              onPress={() => setPaymentAccount()}
            >
              <Text className="text-stone-50 text-center font-bold">
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsertPaymentAccount;
