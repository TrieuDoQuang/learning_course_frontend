import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import images from "../../../assets";
import { Category } from "../../../components";
import { useState, useEffect } from "react";
import PaymentAccountService from "../../../services/PaymentAccountService";
import RewardService from "../../../services/RewardService";
import useAuth from "../../../hooks/useAuth";

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [culinaryRewards, setCulinaryRewards] = useState([]);
  const [entertainmentRewards, setEntertainmentRewards] = useState([]);
  const [shoppingRewards, setShoppingRewards] = useState([]);
  const [paymentAccounts, setPaymentAccounts] = useState([]);
  const [selectedPaymentAccount, setSelectedPaymentAccount] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const { getPaymentAccounts } = PaymentAccountService();
  const { getAllRewards } = RewardService();
  const { customerId } = useAuth();

  useEffect(() => {
    const fetchPaymentAccounts = async () => {
      try {
        const response = await getPaymentAccounts(customerId);
        setPaymentAccounts(response.data.result.paymentAccounts);
        if (response.data.result.paymentAccounts.length > 0)
          setSelectedPaymentAccount(response.data.result.paymentAccounts[0]);
        //console.log(response.data.result);
        console.log(response.data.result.paymentAccounts[0]);
      } catch (error) {
        console.error("Failed to fetch payment accounts", error);
      }
    };

    const fetchAllRewards = async () => {
      try {
        const response = await getAllRewards();
        setRewards(response.data.result.rewards);
        //console.log(response.data.result);
        setEntertainmentRewards([]);
        setCulinaryRewards([]);
        setShoppingRewards([]);
        response.data.result.rewards.forEach((reward) => {
          if (reward.reward_type === "ENTERTAINMENT") {
            setEntertainmentRewards((oldArray) => [...oldArray, reward]);
          } else if (reward.reward_type === "CULINARY") {
            setCulinaryRewards((oldArray) => [...oldArray, reward]);
          } else if (reward.reward_type === "SHOPPING") {
            setShoppingRewards((oldArray) => [...oldArray, reward]);
          }
        });
      } catch (error) {
        console.error("Failed to fetch rewards", error);
      }
    };

    fetchPaymentAccounts();
    fetchAllRewards();
  }, []);

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        <View className="p-3 pt-5">
          {selectedPaymentAccount && (
            <View className="">
              <View className="bg-slate-50 rounded-md">
                <View className="flex-row p-[9px] items-center">
                  <FontAwesomeIcon icon={faUser} color="orange" size={25} />
                  <View className="ml-4 mr-12">
                    <Text>
                      Payment Account - {selectedPaymentAccount.account_number}
                    </Text>
                    <Text className="text-lg font-bold">
                      Reward Points: {selectedPaymentAccount.reward_point} RWP
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <FontAwesomeIcon icon={faChevronDown} color="#3C84AB" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <View className="my-5">
            <Text className="text-sm mb-2">Shopping Voucher</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {shoppingRewards &&
                shoppingRewards.map((reward) => {
                  return (
                    <Category
                      key={reward.id}
                      image={reward.image_link}
                      title={reward.reward_name}
                      price={reward.cost_point}
                    />
                  );
                })}
            </ScrollView>
          </View>
          <View className="my-5">
            <Text className="text-sm mb-2">Entertainment Voucher</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {entertainmentRewards &&
                entertainmentRewards.map((reward) => {
                  return (
                    <Category
                      key={reward.id}
                      image={reward.image_link}
                      title={reward.reward_name}
                      price={reward.cost_point}
                    />
                  );
                })}
            </ScrollView>
          </View>
          <View className="my-5">
            <Text className="text-sm mb-2">Culinary Voucher</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {culinaryRewards &&
                culinaryRewards.map((reward) => {
                  return (
                    <Category
                      key={reward.id}
                      image={reward.image_link}
                      title={reward.reward_name}
                      price={reward.cost_point}
                    />
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rewards;
