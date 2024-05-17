import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { InputItem } from "../../../components";

const TopUp = () => {
  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        <View className="p-3 pt-10">
          <View className="h-[120px]">
            <Text className="text-sm mb-2">Source Payment Account</Text>
            <View className="bg-slate-50 rounded-md">
              <View className="flex-row p-[9px] items-center">
                <FontAwesomeIcon icon={faUser} color="orange" size={25} />
                <View className="ml-4 mr-12">
                  <Text>032299999 - Chau Hoang Gia Dat</Text>
                  <Text className="text-lg font-bold">150.000 VND </Text>
                </View>
                <TouchableOpacity>
                  <FontAwesomeIcon icon={faChevronDown} color="#3C84AB" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="">
            <View className="gap-1">
              <View className="bg-slate-50 p-[9px] rounded-md mb-10">
                <InputItem title="Top Up Amount" />
                <View className="mt-2">
                  <TouchableOpacity className=" h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black ">
                    <Text className="text-center text-md font-bold text-slate-50">
                      Confirm Top Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopUp;
