import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View, TouchableOpacity } from "react-native";
import { faPiggyBank, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { currencyFormatVN } from "../../../utils/CurrencyUtil";

const SavingAccountRowView = (props) => {
  const {
    savingAccount,
    setSelectedSavingAccount,
    setsIsAccountDetailsModalVisible,
  } = props;
  return (
    <View
      className="flex-row items-center justify-between mb-4 ml-2 mr-2 bg-slate-100 py-2 px-2 rounded-md"
      key={savingAccount.id}
    >
      <View>
        <View className="flex-row justify-between mb-2">
          <View className="flex-row items-center" style={{ width: "55%" }}>
            <FontAwesomeIcon icon={faPiggyBank} size={25} />
            <Text className="ml-2">{savingAccount.account_number}</Text>
          </View>
          <View className="flex-row items-center" style={{ width: "25%" }}>
            <Text className="ml-2 font-bold">
              {savingAccount.account_status}
            </Text>
          </View>
        </View>
        <View className="flex-row">
          <Text className=" ">Available Balance</Text>
          <Text className="ml-2">
            {currencyFormatVN(savingAccount.saving_current_amount)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        className="mr-4"
        onPress={() => {
          setSelectedSavingAccount(savingAccount);
          setsIsAccountDetailsModalVisible(true);
        }}
      >
        <FontAwesomeIcon icon={faCircleInfo} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default SavingAccountRowView;
