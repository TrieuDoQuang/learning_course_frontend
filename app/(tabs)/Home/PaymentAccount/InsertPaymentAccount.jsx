import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputItem } from "../../../components";
import { useState, useEffect } from "react";
import { useAuth, useNotification } from "../../../hooks";
import { Notification } from "../../../components";
import PaymentAccountService from "../../../services/PaymentAccountService";
const InsertPaymentAccount = () => {
  const [accountNumber, setAccountNumber] = useState("89");
  const { customerId } = useAuth();
  const { insertPaymentAccount } = PaymentAccountService();
  const { notification, showNotification } = useNotification();

  const setPaymentAccount = async () => {
    if (!/^89\d{4,8}$/.test(accountNumber)) {
      showNotification(
        "Account number must be between 6 to 10 digits and start with 89",
        "error"
      );
      return;
    }

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
    if (/^89\d{0,8}$/.test(newText) || newText === "89") {
      setAccountNumber(newText);
    }
  };
  console.log("accountNumber", accountNumber);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View className="absolute top-[-60px] self-center">
            {notification.type && (
              <Notification
                type={notification.type}
                message={notification.message}
              />
            )}
          </View>
          <View>
            <Text className="font-bold text-lg text-center">
              Add New Payment Account
            </Text>
          </View>
          <View className="p-3 my-4">
            <View className="mb-3 p-2 bg-blue-200 bg-opacity-20 rounded-md">
              <Text className="">
                The account number must be started with '89' and is between 6 to
                10 digits
              </Text>
            </View>
            <InputItem
              title="Account Number"
              value={accountNumber}
              onChangeText={(text) => {
                handleChange(text);
              }}
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
