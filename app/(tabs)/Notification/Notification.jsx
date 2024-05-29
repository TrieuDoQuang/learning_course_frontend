import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationItem } from "../../components";

const Notification = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-3 mb-5">
          <NotificationItem
            dateTime="07:47 17/05/2024"
            currentAccount="8890743713"
            amount="200.000"
            balance="2,243,365"
            remark="TKThe: 054645646465, tai MB. ABCEDED Chuyen khoan"
          />
          <NotificationItem
            dateTime="07:47 17/05/2024"
            currentAccount="8890743713"
            amount="200.000"
            balance="2,243,365"
            remark="TKThe: 054645646465, tai MB. ABCEDED Chuyen khoan"
          />
          <NotificationItem
            dateTime="07:47 17/05/2024"
            currentAccount="8890743713"
            amount="200.000"
            balance="2,243,365"
            remark="TKThe: 054645646465, tai MB. ABCEDED Chuyen khoan"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
