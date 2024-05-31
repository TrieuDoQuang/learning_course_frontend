import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useData } from "../../context/DataProvider";
import { TransactionService } from "../../services";
import { useNotification } from "../../hooks";
import { Notification } from "../../components";
import { router } from "expo-router";

const ConfirmTransaction = () => {
  const [otp, setOtp] = useState("");
  const { transaction } = useData();
  const { makeTransaction } = TransactionService();
  const { notification, showNotification } = useNotification();

  const handleOtpSubmit = async () => {
    try {
      await makeTransaction({
        receiverEmail: transaction.sender_email,
        otp,
        transactionDTO: transaction,
      });

      showNotification("Transaction Completed!", "success");

      setTimeout(() => {
        router.replace({
          pathname: `/Transfer`,
        });
      }, 3000);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <View className="">
        <View className="absolute top-[-60px] self-center">
          {notification.type && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}
        </View>
        <View className="grid gap-4 px-3 pb-6 bg-slate-50 my-2">
          <View className="flex flex-row justify-between">
            <Text>Debit Account</Text>
            <Text>{transaction.sender_account_number}</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text>Beneficiary Account</Text>
            <Text>{transaction.receiver_account_number}</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text>Beneficiary's Name</Text>
            <Text>{transaction.receiver_account_name}</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text>Beneficiary Bank</Text>
            <Text>TDK Banking</Text>
          </View>
        </View>
        <View className="grid gap-4 px-3 pb-6 bg-slate-50 mt-0 mb-2">
          <View className="flex flex-row justify-between">
            <Text>Amount</Text>
            <Text>
              {transaction.amount.toLocaleString("en-US").replace(/,/g, ".")}{" "}
              VND
            </Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text>Transaction Remark</Text>
            <Text className="w-32 text-right">
              {transaction.transaction_remark}
            </Text>
          </View>
        </View>

        <View className="grid px-3 pt-6 pb-3 bg-slate-50">
          <TextInput
            className="border-2 border-gray-300 p-2 mb-4 rounded-md"
            placeholder="Enter OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity
            className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black mb-4"
            onPress={handleOtpSubmit}
          >
            <Text className="text-center text-slate-50 font-bold">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmTransaction;
