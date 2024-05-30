import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import CustomerService from "../../../services/CustomerService";
import { useAuth, useNotification } from "../../../hooks";
import { Notification } from "../../../components";
import PaymentAccountService from "../../../services/PaymentAccountService";
const PaymentAccountDetail = () => {
  const paymentAccount = useLocalSearchParams();
  const [customerData, setCustomerData] = useState([]);
  const { getCustomerById } = CustomerService();
  const { customerId } = useAuth();
  const { setPaymentAccountDefault } = PaymentAccountService();

  const { notification, showNotification } = useNotification();
  console.log("payment aaa", paymentAccount);
  useEffect(() => {
    const fetchDefaultAccount = async () => {
      const customerResponse = await getCustomerById(customerId);
      setCustomerData(customerResponse.data.result);
    };
    fetchDefaultAccount();
  }, []);

  const handleSetPaymentAccountDefault = async (customerId, accountNumber) => {
    try {
      await setPaymentAccountDefault(customerId, accountNumber);
      console.log("Set default payment account successfully");
      showNotification("Set default payment account successfully", "success");
    } catch (error) {
      console.error("Failed to set default payment account:", error);
      showNotification("Failed to set default payment account", "error");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-3 my-2 gap-10">
          <View>
            <View className="flex flex-row justify-between">
              <View className="flex flex-row items-center gap-2">
                <FontAwesomeIcon icon={faFileLines} size={30} />
                <View>
                  <Text>{customerData.name}</Text>
                  <Text>{paymentAccount.account_number}</Text>
                </View>
              </View>
              <View classNam="items-center">
                <TouchableOpacity
                  className="items-center bg-black rounded-md p-3"
                  onPress={() =>
                    handleSetPaymentAccountDefault(
                      customerId,
                      paymentAccount.account_number
                    )
                  }
                >
                  <Text className="font-bold  text-slate-50">
                    Set as default
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View className="bg-gray-200 rounded-md">
              <View className="p-3 flex-row justify-between">
                <View className="gap-3 text-gray-300">
                  <Text>Account Name</Text>
                  <Text>Account Number</Text>
                  <Text>Account Status</Text>
                  <Text>Account Type</Text>
                  <Text>Account Opening Date</Text>
                  <Text>Account Closing Date</Text>

                  <Text>Account Balance</Text>
                  <Text>Reward Point</Text>
                  <Text>Banking</Text>
                </View>
                <View className="gap-3">
                  <Text className="font-bold">{customerData.name}</Text>
                  <Text className="font-bold">
                    {paymentAccount.account_number}
                  </Text>
                  <Text className="font-bold">
                    {paymentAccount.account_status}
                  </Text>
                  <Text className="font-bold">
                    {paymentAccount.account_type}
                  </Text>
                  <Text className="font-bold">
                    {paymentAccount.date_opened}
                  </Text>
                  <Text className="font-bold">
                    {paymentAccount.date_closed}
                  </Text>
                  <Text className="font-bold">
                    {paymentAccount.current_balance}
                  </Text>
                  <Text className="font-bold">
                    {paymentAccount.reward_point}
                  </Text>
                  <Text className="font-bold">TDK BANKING</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentAccountDetail;
