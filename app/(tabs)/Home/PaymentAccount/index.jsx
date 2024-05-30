import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlus,
  faFileLines,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import PaymentAccountService from "../../../services/PaymentAccountService";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
const PaymentAccount = () => {
  const [paymentAccounts, setPaymentAccounts] = useState([]);
  const { getPaymentAccounts } = PaymentAccountService();
  const { customerId } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const fetchPaymentAccounts = async () => {
      try {
        const response = await getPaymentAccounts(customerId);
        setPaymentAccounts(response.data.result.paymentAccounts);
        console.log(response.data.result);
      } catch (error) {
        console.error("Failed to fetch payment accounts", error);
      }
    };

    fetchPaymentAccounts();
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View className="px-3 my-10">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="font-bold">Payment Account</Text>
              <View className="flex-row items-center bg-black rounded-md p-3">
                <FontAwesomeIcon icon={faPlus} size={18} color="#fff" />
                <TouchableOpacity
                  onPress={() =>
                    router.push("/Home/PaymentAccount/InsertPaymentAccount")
                  }
                >
                  <Text className="font-bold ml-2 text-slate-50">
                    Add Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {paymentAccounts &&
              paymentAccounts.map((paymentAccount) => (
                <View
                  className="flex-row items-center justify-between mb-4 bg-slate-100 py-2 px-2 rounded-md"
                  key={paymentAccount.id}
                >
                  <View>
                    <View className="flex-row items-center mb-2">
                      <FontAwesomeIcon icon={faFileLines} size={25} />
                      <Text className="ml-2">
                        {paymentAccount.account_number}
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text className="text-gray-500">Available Balance</Text>
                      <Text className="ml-2">
                        {paymentAccount.current_balance}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: `/Home/PaymentAccount/AccountDetail`,
                        params: paymentAccount,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} size={20} />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PaymentAccount;
