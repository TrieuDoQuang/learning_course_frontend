import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const TransactionItem = () => {
  <View>
    <View className="justify-center items-center">
      <View className="h-[78px] w-[330px]  bg-white rounded-lg my-[5px]">
        <View className="p-3 flex-row  justify-between  items-center">
          <FontAwesomeIcon icon={faUser} size={40} color="orange" />
          <View>
            <Text className="font-bold">Transfer to</Text>
            <Text>Amira Leswana</Text>
            <Text className="text-gray-400">7 March 2022</Text>
          </View>
          <Text className="text-lg font-bold">150.000 VND</Text>
        </View>
      </View>
    </View>
  </View>;
};

export default TransactionItem;
