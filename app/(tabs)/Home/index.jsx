import { useState, useCallback } from "react";
import { PaymentAccountService, CustomerService } from "../../services";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../hooks";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faAngleRight,
  faMoneyBillTransfer,
  faFileArrowUp,
  faWallet,
  faGift,
  faBars,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import images from "../../assets";
import { FeatureItem, TransactionItem } from "../../components";
import { FormatCurrency } from "../../components";
const Home = () => {
  const [customerData, setCustomerData] = useState([]);
  const [defaultAccount, setDefaultAccount] = useState([]);
  const { getDefaultPaymentAccount } = PaymentAccountService();
  const { getCustomerById } = CustomerService();
  const { customerId } = useAuth();
  const [selectedButton, setSelectedButton] = useState("All");
  const [showMoreContent, setShowMoreContent] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchDefaultAccount = async () => {
        try {
          const response = await getDefaultPaymentAccount(customerId);
          const customerResponse = await getCustomerById(customerId);
          setCustomerData(customerResponse.data.result);
          setDefaultAccount(response.data.result);
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      };

      fetchDefaultAccount();
    }, [customerId])
  );

  const buttons = ["All", "Transfer", "Withdraw", "Top up", "More"];

  return (
    <SafeAreaView className="h-full bg-gray-200">
      <ScrollView>
        <View className="mb-6">
          <ImageBackground
            className="justify-center p-[9px] items-center h-[256px]"
            source={images.background}
          >
            <View className="w-full h-[200px] px-2">
              <View className="flex flex-row gap-3 items-center">
                <FontAwesomeIcon icon={faUser} size={30} color="orange" />
                <View className="">
                  <Text className="text-slate-50 font-bold text-[17px]">
                    {customerData.name}
                  </Text>
                  <TouchableOpacity>
                    <Link href="Home/PaymentAccount">
                      <View className="items-center flex flex-row">
                        <Text className="mr-2 text-gray-400 text-md">
                          Payment Accounts
                        </Text>
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          color="rgb(156 163 175)"
                        />
                      </View>
                    </Link>
                  </TouchableOpacity>
                </View>
              </View>
              {defaultAccount && (
                <View className="justify-between flex-row mt-4 items-center">
                  <View>
                    <Text className="text-slate-50 font-bold">
                      Default Account
                    </Text>
                    <Text className="text-slate-50 font-bold">
                      {defaultAccount.account_number}
                    </Text>
                  </View>
                  {defaultAccount.current_balance && (
                    <Text className="text-slate-50 font-bold text-base">
                      {FormatCurrency(defaultAccount.current_balance)} VND
                    </Text>
                  )}
                </View>
              )}
              <View className="flex flex-row justify-between mt-8">
                <FeatureItem title="Transfer" icon={faMoneyBillTransfer} />
                <FeatureItem title="Withdraw" icon={faFileArrowUp} />
                <FeatureItem title="TopUp" icon={faWallet} />
                <View className="items-center">
                  <TouchableOpacity
                    className="h-[40px] w-[40px] bg-slate-50 items-center justify-center rounded-sm"
                    onPress={() => setShowMoreContent(!showMoreContent)}
                  >
                    <FontAwesomeIcon icon={faBars} size={25} color="#2B2DE2" />
                  </TouchableOpacity>
                  <Text className="text-slate-50 mt-2">More</Text>
                </View>
              </View>
              {showMoreContent && (
                <ImageBackground
                  source={images.bglinear}
                  resizeMode="cover"
                  borderRadius={6}
                  className="bg-gray-400 p-4 flex flex-row self-end rounded-md"
                >
                  <FeatureItem className="mr-5" title="Rewards" icon={faGift} />
                  <FeatureItem title="Savings" icon={faPiggyBank} />
                </ImageBackground>
              )}
            </View>
          </ImageBackground>
          <View className="h-[100px] bg-white justify-center items-center">
            <View className="w-[330px] h-[56px] ">
              <Text className="text-xl font-bold">Transactions</Text>
              <View className="flex flex-row justify-between mt-2">
                {buttons.map((button, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`border p-1 rounded-md ${
                      selectedButton === button ? "bg-blue-3" : "bg-white"
                    }`}
                    onPress={() => setSelectedButton(button)}
                  >
                    <Text
                      className={`${
                        selectedButton === button
                          ? "text-slate-50"
                          : "text-black"
                      }`}
                    >
                      {button}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <View className="justify-center items-center">
            <View className="w-[330px] h-[15px] flex flex-row justify-between ">
              <Text className="font-bold">Current Transaction</Text>
              <TouchableOpacity>
                <Text className="text-blue-500 ">See all</Text>
              </TouchableOpacity>
            </View>
            <View className="px-11 mt-4">
              <TransactionItem
                image={images.avatar}
                name="Do Quang Trieu"
                date="14 May 2024"
                amount="200.000"
              />
              <TransactionItem
                image={images.avatar}
                name="Do Quang Trieu"
                date="14 May 2024"
                amount="200.000"
              />
              <TransactionItem
                image={images.avatar}
                name="Do Quang Trieu"
                date="14 May 2024"
                amount="200.000"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
