import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useData } from "../../context/DataProvider";
import TransactionService from "../../services/TransactionService";

const ConfirmTransaction = () => {
  const [otp, setOtp] = useState("");
  const { transaction } = useData();
  const { makeTransaction } = TransactionService();

  const handleOtpSubmit = async () => {
    try {
      await makeTransaction({
        receiverEmail: transaction.sender_email,
        otp,
        transactionDTO: transaction,
      });
      alert("Transaction Completed!");
    } catch (error) {
      console.error("Failed to verify OTP or make transaction:", error);
      alert("Invalid OTP or transaction failed");
    }
  };

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <View className="p-3 pt-10">
        <Text className="text-lg font-bold">Confirm Transaction</Text>
        <Text>Sender Account: {transaction.sender_account_number}</Text>
        <Text>Receiver Account: {transaction.receiver_account_number}</Text>
        <Text>Receiver Name: {transaction.receiver_account_name}</Text>
        <Text>Amount: {transaction.amount}</Text>
        <Text>Remark: {transaction.transaction_remark}</Text>
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
    </SafeAreaView>
  );
};

export default ConfirmTransaction;
