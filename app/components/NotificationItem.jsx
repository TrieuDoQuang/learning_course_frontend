import { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckDouble,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { PaymentAccountService } from "../services";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../hooks";

const NotificationItem = ({
  timeString,
  fullDateTime,
  currentAccount,
  amount,
  remark,
}) => {
  const [defaultAccountNumber, setDefaultAccountNumber] = useState([]);
  const { getDefaultPaymentAccount } = PaymentAccountService();
  const { customerId } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchDefaultAccount = async () => {
        try {
          const response = await getDefaultPaymentAccount(customerId);

          setDefaultAccountNumber(response.data.result.account_number);
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      };

      fetchDefaultAccount();
    }, [customerId])
  );

  return (
    <View className="mb-3">
      <View>
        <View className="flex-row justify-between items-center mb-1">
          <View className="flex flex-row justify-center items-center">
            <FontAwesomeIcon
              icon={faCheckDouble}
              color="rgb(156 163 175)"
              size={12}
            />
            <Text className="ml-1 text-xs text-gray-400">{timeString}</Text>
          </View>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            size={12}
            color="rgb(156 163 175)"
          />
        </View>
        <View className="bg-slate-200 py-2 px-4 rounded-md">
          <Text className="text-sm">TDK Banking is pleased to announce</Text>
          <Text className="text-sm">
            Transaction time: <Text className="font-bold">{fullDateTime}</Text>
          </Text>
          <Text className="text-sm">
            Current Account: <Text className="font-bold">{currentAccount}</Text>
          </Text>
          <Text className="text-sm">
            Transaction Amount:{" "}
            {defaultAccountNumber === currentAccount ? (
              <Text className="font-bold text-red-500">
                -{amount.toLocaleString("en-US").replace(/,/g, ".")} VND
              </Text>
            ) : (
              <Text className="font-bold text-green-500">
                +{amount.toLocaleString("en-US").replace(/,/g, ".")} VND
              </Text>
            )}
          </Text>
          <Text className="text-sm">
            Transaction Remark: <Text>{remark}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationItem;
