import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
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
  faBars,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import images from "../../assets";
import { FeatureItem, TransactionItem } from "../../components";

const Home = () => {
  const [selectedButton, setSelectedButton] = useState("All");

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
                    Chau Hoang Gia Dat
                  </Text>
                  <TouchableOpacity>
                    <Link href="Home/PaymentAccount">
                      <View className="items-center flex flex-row">
                        <Text className="mr-2 text-gray-400 text-md">
                          Payment Account
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
              <View className="justify-between flex-row mt-4">
                <Text className="text-slate-50 font-bold">Current Balance</Text>
                <Text className="text-slate-50 font-bold">2.000.000 VND</Text>
              </View>
              <View className="flex flex-row justify-between mt-8">
                <FeatureItem title="Transfer" icon={faMoneyBillTransfer} />
                <FeatureItem title="Withdraw" icon={faFileArrowUp} />
                <FeatureItem title="Top Up" icon={faWallet} />
                <FeatureItem title="Rewards" icon={faGift} />
              </View>
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
