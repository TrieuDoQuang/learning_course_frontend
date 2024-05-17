import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faE, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const NotificationItem = ({
  dateTime,
  currentAccount,
  amount,
  balance,
  remark,
}) => {
  return (
    <View className="mb-3">
      <Text>Today</Text>
      <View>
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-xs text-gray-400">07:48</Text>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            size={12}
            color="rgb(156 163 175)"
          />
        </View>
        <View className="bg-slate-200 py-2 px-4 rounded-md">
          <Text className="text-sm">TDK is pleased to announce</Text>
          <Text className="text-sm">
            Transaction time: <Text className="font-bold">{dateTime}</Text>
          </Text>
          <Text className="text-sm">
            Current Account: <Text className="font-bold">{currentAccount}</Text>
          </Text>
          <Text className="text-sm">
            Transaction Amount:{" "}
            <Text className="font-bold text-green-500">+ {amount} VND</Text>
          </Text>
          <Text className="text-sm">
            Balance :{" "}
            <Text className="font-bold text-blue-500">{balance} VND</Text>
          </Text>
          <Text className="text-sm">
            Transaction Remark: <Text className="">{remark}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationItem;
