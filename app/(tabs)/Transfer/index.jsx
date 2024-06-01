import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import InputItem from "../../components/InputItem";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import {
  CustomerService,
  TransactionService,
  PaymentAccountService,
} from "../../services";
import { TransactionData, PaymentAccountData, CustomerData } from "../../data";
import { useAuth } from "../../hooks";
import { useData } from "../../context/DataProvider";
import { Notification } from "../../components";
import { useNotification } from "../../hooks";

const Transfer = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [sender, setSender] = useState(CustomerData);
  const [defaultPaymentAccount, setDefaultPaymentAccount] =
    useState(PaymentAccountData);
  const [transaction, setTransaction] = useState(TransactionData);
  const { getCustomerById } = CustomerService();
  const { getCustomerByAccountNumber, getDefaultPaymentAccount } =
    PaymentAccountService();
  const { sendOtp } = TransactionService();
  const { customerId } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { setTransaction: setTransactionContext } = useData();
  const { notification, showNotification } = useNotification();
  const data = useLocalSearchParams();
  const receiverAccountNumber =
    Object.keys(data)
      .map(Number)
      .sort((a, b) => a - b)
      .map((key) => data[key])
      .join("") || transaction.receiver_account_number;
  console.log(receiverAccountNumber);
  useEffect(() => {
    if (route.params?.accountNumber) {
      setTransaction((prevTransaction) => ({
        ...prevTransaction,
        receiver_account_number: route.params.accountNumber,
      }));
    }
  }, [route.params?.accountNumber]);

  useEffect(() => {
    const fetchReceiverName = async () => {
      if (receiverAccountNumber.length === 10) {
        try {
          const response = await getCustomerByAccountNumber(
            receiverAccountNumber
          );
          if (!response || !response.data) {
            showNotification("Invalid account number", "error");
            return;
          }
          setTransaction((prevTransaction) => ({
            ...prevTransaction,
            receiver_account_name: response.data.result.name,
          }));
        } catch (error) {
          console.error("Failed to fetch customer name:", error);
        }
      }
    };
    fetchReceiverName();
  }, [transaction.receiver_account_number]);

  useFocusEffect(
    useCallback(() => {
      const fetchSenderData = async () => {
        try {
          const response = await getCustomerById(customerId);
          if (!response || !response.data) {
            console.error("Invalid response from getCustomerById:", response);
            throw new Error("Failed to fetch sender data");
          }
          const senderData = response.data.result;
          setSender(senderData);
          setTransaction((prevTransaction) => ({
            ...prevTransaction,
            sender_email: senderData.email,
            transaction_remark: senderData.name + " Chuyen tien",
          }));
        } catch (error) {
          console.error("Failed to fetch sender data:", error);
        }
      };

      const fetchDefaultPaymentAccount = async () => {
        try {
          const response = await getDefaultPaymentAccount(customerId);
          if (!response || !response.data) {
            console.error(
              "Invalid response from getDefaultPaymentAccount:",
              response
            );
            throw new Error("Failed to fetch default payment account");
          }
          const defaultAccount = response.data.result;
          setDefaultPaymentAccount(defaultAccount);
          setTransaction((prevTransaction) => ({
            ...prevTransaction,
            sender_account_number: defaultAccount.account_number,
          }));
        } catch (error) {
          console.error("Failed to fetch default payment account:", error);
        }
      };

      fetchDefaultPaymentAccount();
      fetchSenderData();
    }, [customerId])
  );

  const handleConfirmTransaction = () => {
    if (
      transaction.receiver_account_number &&
      transaction.receiver_account_name &&
      transaction.amount &&
      transaction.transaction_remark
    ) {
      if (transaction.amount > defaultPaymentAccount.current_balance) {
        showNotification(
          "Transfer amount must not be larger than current balance",
          "error"
        );
      } else {
        setModalVisible(true);
      }
    } else {
      showNotification(
        "Please fill in all fields before confirming the transaction",
        "error"
      );
    }
  };

  const handlePinSubmit = async () => {
    try {
      const response = await getCustomerById(customerId);
      const existingPinNumber = response?.data?.result?.pin_number;
      if (String(existingPinNumber) === pin) {
        await sendOtp({ receiver_email: sender.email });
        setTransactionContext(transaction);
        setTransaction({
          ...transaction,
          amount: 0,
          receiverAccountNumber: "",
          receiver_account_name: "",
        });
        navigation.navigate("ConfirmTransaction");
      } else {
        showNotification("Invalid PIN", "error");
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
    } finally {
      setModalVisible(false);
      setPin("");
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "receiver_account_number") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setTransaction((prevTransaction) => ({
          ...prevTransaction,
          [field]: value,
        }));
      }
    } else {
      setTransaction((prevTransaction) => ({
        ...prevTransaction,
        [field]: value,
      }));
    }
  };

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        <View className="p-3 pt-10">
          {notification.type && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}
          <View className="h-[120px]">
            <Text className="text-sm mb-2">Source Payment Account</Text>
            <View className="bg-slate-50 rounded-md">
              <View className="flex-row p-[9px] items-center">
                <FontAwesomeIcon icon={faUser} color="orange" size={25} />
                <View className="ml-4 mr-12">
                  <Text>
                    {defaultPaymentAccount.account_number} - {sender.name}
                  </Text>
                  <Text className="text-lg font-bold">
                    {defaultPaymentAccount.current_balance
                      .toLocaleString("en-US")
                      .replace(/,/g, ".")}{" "}
                    VND
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View className="gap-1">
              <Text className="text-sm">To</Text>
              <View className="bg-slate-50 p-[9px] rounded-md mb-10">
                <InputItem
                  title="Account Number"
                  value={transaction.receiver_account_number}
                  onChangeText={(value) =>
                    handleInputChange("receiver_account_number", value)
                  }
                  maxLength={10}
                  keyboardType="numeric"
                />
                <InputItem
                  title="Account Name"
                  value={transaction.receiver_account_name}
                />
                <InputItem
                  title="Amount"
                  value={transaction.amount}
                  onChangeText={(value) => handleInputChange("amount", value)}
                />
                <InputItem
                  title="Transaction Remark"
                  value={transaction.transaction_remark}
                  onChangeText={(value) =>
                    handleInputChange("transaction_remark", value)
                  }
                />
                <View className="mt-2">
                  <TouchableOpacity
                    className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black"
                    onPress={handleConfirmTransaction}
                  >
                    <Text className="text-center text-md font-bold text-slate-50">
                      Confirm Transaction
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className="flex-1 justify-center items-center mx-8 my-52 rounded-lg"
          style={{ backgroundColor: "rgba(1, 1, 1, 0.8)" }}
        >
          <View className="bg-white p-6 rounded-lg w-full">
            <Text className="text-lg font-bold mb-4 text-slate-50">
              Enter Your PIN
            </Text>
            <TextInput
              className="border-2 border-gray-300 p-2 mb-4 rounded-md text-slate-50"
              keyboardType="numeric"
              secureTextEntry={true}
              value={pin}
              onChangeText={setPin}
            />
            <TouchableOpacity
              className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black mb-4"
              onPress={handlePinSubmit}
            >
              <Text className="text-center text-slate-50 font-bold">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Transfer;
