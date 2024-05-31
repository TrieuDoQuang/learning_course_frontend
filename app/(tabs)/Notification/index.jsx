import React, { useState, useCallback } from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationItem } from "../../components";
import { TransactionService } from "../../services";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../hooks";
import moment from "moment";

const Notification = () => {
  const [transactions, setTransactions] = useState([]);

  const { getAllTransactionsByCustomerId } = TransactionService();

  const { customerId } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchTransactions = async () => {
        try {
          const transactionsResponse = await getAllTransactionsByCustomerId(
            customerId
          );

          setTransactions(transactionsResponse.result.transactions);
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      };

      fetchTransactions();
    }, [customerId])
  );

  const sortAndGroupTransactions = (transactions) => {
    const sortedTransactions = transactions.sort(
      (a, b) =>
        moment(b.transaction_date_time) - moment(a.transaction_date_time)
    );

    const groupedTransactions = sortedTransactions.reduce(
      (groups, transaction) => {
        const date = moment(transaction.transaction_date_time).format(
          "DD-MM-YYYY"
        );
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
      },
      {}
    );

    return Object.keys(groupedTransactions).map((date) => ({
      date,
      transactions: groupedTransactions[date],
    }));
  };

  const formatDateTime = (datetime) => {
    const date = moment(datetime);
    const now = moment();
    const timeString = date.format("HH:mm");
    const dateString = date.isSame(now, "day")
      ? "Today"
      : date.format("DD-MM-YYYY");
    return {
      timeString,
      dateString,
      fullDateTime: `${timeString} ${date.format("DD-MM-YYYY")}`,
    };
  };

  const groupedTransactions = sortAndGroupTransactions(transactions);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-3 mb-5">
          {groupedTransactions.length > 0 ? (
            groupedTransactions.map((group, index) => (
              <View key={index}>
                <Text className="text-md font-bold mb-1">
                  {group.date === moment().format("DD-MM-YYYY")
                    ? "Today"
                    : group.date}
                </Text>
                {group.transactions.map((transaction, index) => {
                  const { timeString, fullDateTime } = formatDateTime(
                    transaction.transaction_date_time
                  );
                  return (
                    <NotificationItem
                      key={index}
                      timeString={timeString}
                      fullDateTime={fullDateTime}
                      currentAccount={transaction.sender_account_number}
                      amount={transaction.amount}
                      remark={transaction.transaction_remark}
                    />
                  );
                })}
              </View>
            ))
          ) : (
            <View className="text-center mx-[50%] my-[50%]">
              <Text>No transactions found</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
