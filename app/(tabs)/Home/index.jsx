import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground 
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
} from "@fortawesome/free-solid-svg-icons";
import images from "../../assets";

const FeatureItem = ({ title, icon }) => {
  return (
    <View className="items-center">
      <View className="bg-slate-50 rounded-[3px]">
        <TouchableOpacity className="h-[40px] w-[40px] bg-white items-center justify-center rounded-sm">
          <Link className href={`/Home/${title}`}>
            <FontAwesomeIcon icon={icon} size={25} color="#2B2DE2" />
          </Link>
        </TouchableOpacity>
      </View>
      <Text className="text-slate-50 mt-2">{title}</Text>
    </View>
  );
};

const Home = () => {
  const [selectedButton, setSelectedButton] = useState("All");

  const buttons = ["All", "Transfer", "Withdraw", "Top up", "More"];

  return (
    <SafeAreaView className="h-full bg-gray-200">
      <ScrollView>
        <View className="flex gap-3">
          <ImageBackground className="justify-center p-[9px] items-center h-[256px]" source={images.background}>
            <View className="w-[300px] h-[200px]">
              <View className="flex flex-row gap-3 items-center">
                <FontAwesomeIcon icon={faUser} size={30} color="orange" />
                <View className="">
                  <Text className="text-slate-50 font-bold text-[17px]">
                    Chau Hoang Gia Dat
                  </Text>
                  <TouchableOpacity>
                    <Link href="Home/Payment">
                      <View className="items-center flex flex-row">
                        <Text className="mr-2 text-gray-400">
                          Payment Account
                        </Text>
                        <FontAwesomeIcon icon={faAngleRight} color="gray" />
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
                <FeatureItem title="More" icon={faBars} />
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
            <View className="w-[330px] h-[60px] flex flex-row justify-between bg-white my-2">
              <View className="flex flex-column justify-center ml-2">
                <Image className={"w-[45px] h-[45px]"} source={images.avatar} />
              </View>
              <View className="flex flex-column justify-between w-[120px]">
                <Text className="text-xs font-bold">Transfer to</Text>
                <Text className="text-xs max-h-[20px]">Do Quan Trieu</Text>
                <Text className="text-xs font-light">14 May 2024</Text>
              </View>
              <View className="flex flex-column justify-center mr-2 w-[100px]">
                <Text className="font-bold">200.000 VND</Text>
              </View>
            </View>
            <View className="w-[330px] h-[60px] flex flex-row justify-between bg-white my-2">
              <View className="flex flex-column justify-center ml-2">
                <Image className={"w-[45px] h-[45px]"} source={images.avatar} />
              </View>
              <View className="flex flex-column justify-between w-[120px]">
                <Text className="text-xs font-bold">Transfer to</Text>
                <Text className="text-xs max-h-[20px]">
                  Duong Duc Khai aaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </Text>
                <Text className="text-xs font-light">13 May 2024</Text>
              </View>
              <View className="flex flex-column justify-center mr-2 w-[100px]">
                <Text className="font-bold">150.000 VND</Text>
              </View>
            </View>
            <View className="w-[330px] h-[60px] flex flex-row justify-between bg-white my-2">
              <View className="flex flex-column justify-center ml-2">
                <Image className={"w-[45px] h-[45px]"} source={images.avatar} />
              </View>
              <View className="flex flex-column justify-between w-[120px]">
                <Text className="text-xs font-bold">Transfer from</Text>
                <Text className="text-xs max-h-[20px]">Tran </Text>
                <Text className="text-xs font-light">11 May 2024</Text>
              </View>
              <View className="flex flex-column justify-center mr-2 w-[100px]">
                <Text className="font-bold">100.000.000 VND</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
