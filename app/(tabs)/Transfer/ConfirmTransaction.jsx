// ConfirmTransaction.js
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useData } from "../../context/DataProvider";

const ConfirmTransaction = () => {
  
  const { transaction } = useData();

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <View className="p-3 pt-10">
        <Text className="text-lg font-bold">Confirm Transaction</Text>
        <Text>Sender Account: {transaction.sender_account_number}</Text>
        <Text>Receiver Account: {transaction.receiver_account_number}</Text>
        <Text>Receiver Name: {transaction.receiver_account_name}</Text>
        <Text>Amount: {transaction.amount}</Text>
        <Text>Remark: {transaction.transaction_remark}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmTransaction;
