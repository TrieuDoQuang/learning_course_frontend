import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {} from "@fortawesome/free-solid-svg-icons";

import SavingAccountService from "../../../services/SavingAccountService";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import SavingAccountRowView from "./SavingAccountRowView";

const Savings = () => {
  const [activeSavingAccounts, setActiveSavingAccounts] = useState([]);
  const [inactiveSavingAccounts, setInactiveSavingAccounts] = useState([]);
  const [selectedAccountStatus, setSelectedAccountStatus] = useState("All");
  const { customerId } = useAuth();
  const { getUserSavingAccounts } = SavingAccountService();

  useEffect(() => {
    const fetchUserSavingAccounts = async () => {
      try {
        const response = await getUserSavingAccounts(customerId);
        //setSavingAccounts(response.data.result.savingAccounts);
        console.log(response.data.result);
        setActiveSavingAccounts([]);
        setInactiveSavingAccounts([]);
        response.data.result.savingAccounts.forEach((savingAccount) => {
          if (savingAccount.account_status === "ACTIVE") {
            setActiveSavingAccounts((oldArray) => [...oldArray, savingAccount]);
          } else if (savingAccount.account_status === "INACTIVE") {
            setInactiveSavingAccounts((oldArray) => [
              ...oldArray,
              savingAccount,
            ]);
          }
        });
      } catch (error) {
        console.error("Failed to fetch user saving accounts", error);
      }
    };

    fetchUserSavingAccounts();
  }, []);

  const data = [
    { key: "All", value: "All" },
    { key: "Active", value: "Active" },
    { key: "Inactive", value: "Inactive" },
  ];

  return (
    <SafeAreaView className="bg-gray-200" style={{ flex: 1 }}>
      <ScrollView>
        <View className="flex-row items-center justify-between ml-2 mr-2 mb-3 mt-3">
          <Text className="font-bold">Saving Accounts</Text>
          <View className="flex" style={{ width: "40%" }}>
            <SelectList
              setSelected={(val) => {
                setSelectedAccountStatus(val);
                console.log("Select status: " + val);
              }}
              data={data}
              placeholder={selectedAccountStatus}
              searchPlaceholder=""
              save={selectedAccountStatus}
            ></SelectList>
          </View>
        </View>
        {selectedAccountStatus === "All" && (
          <>
            {activeSavingAccounts.map((savingAccount) => {
              return <SavingAccountRowView savingAccount={savingAccount} />;
            })}
            {inactiveSavingAccounts.map((savingAccount) => {
              return <SavingAccountRowView savingAccount={savingAccount} />;
            })}
          </>
        )}

        {selectedAccountStatus === "Active" &&
          activeSavingAccounts.map((savingAccount) => {
            return <SavingAccountRowView savingAccount={savingAccount} />;
          })}

        {selectedAccountStatus === "Inactive" &&
          inactiveSavingAccounts.map((savingAccount) => {
            return <SavingAccountRowView savingAccount={savingAccount} />;
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Savings;
