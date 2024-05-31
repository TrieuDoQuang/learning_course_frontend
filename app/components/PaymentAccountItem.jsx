import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PaymentAccountService from "../services/PaymentAccountService";
import CustomerService from "../services/CustomerService";
import { useAuth } from "../hooks";
import { router } from "expo-router";

const PaymentAccountItem = ({
  isOpenAccount,
  setIsOpenAccount,
  customer,
  isWithdraw,
}) => {
  const { customerId } = useAuth();
  const { getPaymentAccounts } = PaymentAccountService();
  const [customerData, setCustomerData] = useState([]);
  const { getCustomerById } = CustomerService();
  const [paymentAccounts, setPaymentAccounts] = useState([]);

  const fetchPaymentAccounts = async () => {
    try {
      const response = await getPaymentAccounts(customerId);
      setPaymentAccounts(response.data.result.paymentAccounts);
      console.log();
    } catch (error) {
      console.error("Failed to fetch payment accounts", error);
    }
  };

  useEffect(() => {
    fetchPaymentAccounts();
  }, []);

  const handleOnPress = (paymentAccount) => {
    setIsOpenAccount(!isOpenAccount);
    router.push({
      pathname: isWithdraw ? "/Home/Withdraw" : "/Home/TopUp",
      params: paymentAccount,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="my-2 p-3 gap-3 flex-1 z-50 h-full bg-gray-400">
          {paymentAccounts.length > 0 ? (
            paymentAccounts.map((paymentAccount) => (
              <TouchableOpacity
                onPress={() => handleOnPress(paymentAccount)}
                key={paymentAccount.id}
              >
                <View className="bg-slate-50 rounded-md">
                  <View className="flex-row p-[9px] items-center">
                    <FontAwesomeIcon icon={faUser} color="orange" size={25} />
                    <View className="ml-4 mr-12">
                      <Text>
                        {paymentAccount.account_number} - {customer.name}
                      </Text>
                      <Text className="text-lg font-bold">
                        {paymentAccount.current_balance}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No payment accounts found.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentAccountItem;
