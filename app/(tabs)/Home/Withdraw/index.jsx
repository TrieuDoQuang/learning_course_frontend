import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { InputItem } from "../../../components";
import PaymentAccountService from "../../../services/PaymentAccountService";
import CustomerService from "../../../services/CustomerService";
import { useEffect, useState } from "react";
import { Notification } from "../../../components";
import { useAuth, useNotification } from "../../../hooks";
import { useLocalSearchParams } from "expo-router";
import { PaymentAccountItem } from "../../../components";

const Withdraw = () => {
  const { notification, showNotification } = useNotification();
  const [amount, setAmount] = useState("");
  const [selectedAccountBalance, setSelectedAccountBalance] = useState(0);
  const [isWithdraw, setIsWithdraw] = useState(true);
  const { customerId } = useAuth();
  const paymentAccount = useLocalSearchParams();
  const { withdrawPaymentAccount, getDefaultPaymentAccount } =
    PaymentAccountService();
  const { getCustomerById } = CustomerService();
  const [customer, setCustomer] = useState([]);
  const [defaultAccount, setDefaultAccount] = useState([]);

  const fetchDefaultAccount = async () => {
    try {
      const response = await getDefaultPaymentAccount(customerId);
      setDefaultAccount(response.data.result);
      setSelectedAccountBalance(response.data.result.current_balance);
      return response.data.result;
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const fetchCustomer = async () => {
    try {
      const response = await getCustomerById(customerId);
      setCustomer(response.data.result);
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
  };

  const selectedPaymentAccount =
    Object.keys(paymentAccount).length > 0 ? paymentAccount : defaultAccount;

  useEffect(() => {
    fetchDefaultAccount();
    fetchCustomer();
  }, []);

  const [isOpenAccount, setIsOpenAccount] = useState(false);

  const handleWithdraw = async () => {
    try {
      const response = await withdrawPaymentAccount(
        selectedPaymentAccount.id,
        amount
      );
      if (response.status === 200) {
        const updatedBalance = selectedAccountBalance - parseFloat(amount);
        setSelectedAccountBalance(updatedBalance);
        setAmount("");
        showNotification("Withdraw Successful", "success");
      } else {
        showNotification(response.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      showNotification(`Failed to Withdraw: ${error.message}`, "error");
    }
  };

  const handleChange = (text) => {
    const newText = text.replace(/[^0-9]/g, "");
    if (/\d{0,8}$/.test(newText)) {
      setAmount(newText);
    }
  };

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        <View className="absolute top-[-60px] self-center">
          {notification.type && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}
        </View>
        <View className="p-3 pt-10">
          <View className="h-[120px]">
            <Text className="text-sm mb-2">Source Payment Account</Text>
            <View className="bg-slate-50 rounded-md">
              <View className="flex-row p-[9px] items-center">
                <FontAwesomeIcon icon={faUser} color="orange" size={25} />
                <View className="ml-4 mr-12">
                  <Text>
                    {selectedPaymentAccount.account_number} - {customer.name}
                  </Text>
                  <Text className="text-lg font-bold">
                    {selectedAccountBalance} VND
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setIsOpenAccount(!isOpenAccount)}
                >
                  <FontAwesomeIcon icon={faChevronDown} color="#3C84AB" />
                </TouchableOpacity>
              </View>
              <ImageBackground>
                {isOpenAccount && (
                  <PaymentAccountItem
                    isOpenAccount={isOpenAccount}
                    setIsOpenAccount={setIsOpenAccount}
                    customer={customer}
                    onClose={() => setIsOpenAccount(false)}
                    isWithdraw={isWithdraw}
                  />
                )}
              </ImageBackground>
            </View>
          </View>
          <View className="-z-10">
            <View className="gap-1">
              <View className="bg-slate-50 p-[9px] rounded-md mb-10">
                <InputItem
                  title="Withdraw Amount"
                  value={amount}
                  onChangeText={handleChange}
                />
                <View className="mt-2">
                  <TouchableOpacity
                    className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black"
                    onPress={handleWithdraw}
                  >
                    <Text className="text-center text-md font-bold text-slate-50">
                      Confirm Withdraw
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="mt-2 p-2 bg-blue-200 bg-opacity-20 rounded-md">
                  <Text>
                    Withdraw exceeding the balance will be considered as 5.000.000 VND
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Withdraw;
