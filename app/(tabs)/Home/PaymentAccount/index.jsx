import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlus,
  faFileLines,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Payment = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View className="px-3 mb-10">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="font-bold">Payment Account</Text>
              <View className="flex-row items-center bg-black rounded-md p-3">
                <FontAwesomeIcon icon={faPlus} size={18} color="#fff" />
                <Text className="font-bold ml-2 text-slate-50">
                  Add Account
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between mb-4 bg-slate-100 py-2 px-2 rounded-md">
              <View>
                <View className="flex-row items-center mb-2">
                  <FontAwesomeIcon icon={faFileLines} size={25} />
                  <Text className="ml-2">8966625782</Text>
                </View>
                <View className="flex-row">
                  <Text className="text-gray-500">Available Balance</Text>
                  <Text className="ml-2">12.000.000 VND</Text>
                </View>
              </View>
              <FontAwesomeIcon icon={faAngleRight} size={20} />
            </View>
            <View className="flex-row items-center justify-between mb-4 bg-slate-100 py-2 px-2 rounded-md">
              <View>
                <View className="flex-row items-center mb-2">
                  <FontAwesomeIcon icon={faFileLines} size={25} />
                  <Text className="ml-2">8966625782</Text>
                </View>
                <View className="flex-row">
                  <Text className="text-gray-500">Available Balance</Text>
                  <Text className="ml-2">12.000.000 VND</Text>
                </View>
              </View>
              <FontAwesomeIcon icon={faAngleRight} size={20} />
            </View>
            <View className="flex-row items-center justify-between mb-4 bg-slate-100 py-2 px-2 rounded-md">
              <View>
                <View className="flex-row items-center mb-2">
                  <FontAwesomeIcon icon={faFileLines} size={25} />
                  <Text className="ml-2">8966625782</Text>
                </View>
                <View className="flex-row">
                  <Text className="text-gray-500">Available Balance</Text>
                  <Text className="ml-2">12.000.000 VND</Text>
                </View>
              </View>
              <FontAwesomeIcon icon={faAngleRight} size={20} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Payment;
