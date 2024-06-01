import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import {
  faHandHoldingDollar,
  faFire,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

import SavingAccountService from "../../../services/SavingAccountService";
import PaymentAccountService from "../../../services/PaymentAccountService";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import SavingAccountRowView from "./SavingAccountRowView";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { currencyFormatVN } from "../../../utils/CurrencyUtil";
import SavingAccountDetailsModal from "./SavingAccountDetailsModal";

const Savings = () => {
  const [paymentAccounts, setPaymentAccounts] = useState([]);
  const [depositPackages, setDepositPackages] = useState();
  const [activeSavingAccounts, setActiveSavingAccounts] = useState([]);
  const [inactiveSavingAccounts, setInactiveSavingAccounts] = useState([]);
  const [selectedAccountStatus, setSelectedAccountStatus] = useState("All");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const { customerId } = useAuth();
  const { getUserSavingAccounts, getAllInterestRates, insertSavingAccount, withdrawSavingAccount } =
    SavingAccountService();
  const { getPaymentAccounts } = PaymentAccountService();

  //add saving account
  const [selectedDepositPackage, setSelectedDepositPackage] = useState();
  const [selectedAssociatedAccount, setSelectedAssociatedAccount] = useState();
  const [accountType, setAccountType] = useState("CLASSIC");
  const [depositAmount, setDepositAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //show saving account details
  const [selectedSavingAccount, setSelectedSavingAccount] = useState();
  const [isAccountDetailsModalVisible, setsIsAccountDetailsModalVisible] =
    useState(false);
  const [withdrawMessage, setWithdrawMessage] = useState("")

  const data = [
    { key: "All", value: "All" },
    { key: "Active", value: "Active" },
    { key: "Inactive", value: "Inactive" },
  ];

  let depositPackageData = [];
  if (depositPackages != null) {
    depositPackages.map((depositPackage) => {
      depositPackageData.push({
        key: depositPackage,
        value: `term: ${depositPackage.term}, rate: ${
          depositPackage.interest_rate
        }%, min: ${currencyFormatVN(depositPackage.min_balance)}`,
      });
    });
    console.log(depositPackageData);
  }

  let associatedAccountData = [];
  if (paymentAccounts != null) {
    paymentAccounts.map((account) => {
      associatedAccountData.push({
        key: account,
        value: `No ${account.account_number}`,
      });
    });
    console.log(associatedAccountData);
  }

  const accountTypeData = [
    { key: "CLASSIC", value: "CLASSIC" },
    { key: "PREMIUM", value: "PREMIUM" },
  ];

  const onSubmit = async () => {
    console.log(
      "DATA: " +
        selectedDepositPackage +
        " /// " +
        selectedAssociatedAccount +
        " /// " +
        accountType +
        " /// " +
        depositAmount
    );

    if (selectedDepositPackage === undefined) {
      setErrorMessage("Please select a deposit package.");
      return;
    }
    if (selectedAssociatedAccount === undefined) {
      setErrorMessage("Please select an associated account.");
      return;
    }
    if (depositAmount <= 0) {
      setErrorMessage("Please specify the deposit amount.");
      return;
    }
    if (depositAmount > selectedAssociatedAccount.current_balance) {
      setErrorMessage("Associated account has insufficient balance.");
      return;
    }
    if (depositAmount < selectedDepositPackage.min_balance) {
      setErrorMessage(
        `The minimum deposit amount for this package is: ${currencyFormatVN(
          selectedDepositPackage.min_balance
        )}`
      );
      return;
    }

    setErrorMessage("Creating...");
    const response = await insertSavingAccount(
      selectedDepositPackage.id,
      selectedAssociatedAccount.id,
      accountType,
      depositAmount
    );

    if (response.data.status === "OK") {
      fetchUserSavingAccounts();
      fetchPaymentAccounts();
      setSelectedDepositPackage(undefined);
      setSelectedAssociatedAccount(undefined);
      setDepositAmount(0);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } else {
      setErrorMessage(response.data.message);
    }
  };

  const toggleAddModal = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };

  const onDepositAmountChanged = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setDepositAmount(numericValue);
  };

  const fetchUserSavingAccounts = async () => {
    try {
      const response = await getUserSavingAccounts(customerId);
      console.log(response.data.result);
      setActiveSavingAccounts([]);
      setInactiveSavingAccounts([]);
      response.data.result.savingAccounts.forEach((savingAccount) => {
        if (savingAccount.account_status === "ACTIVE") {
          setActiveSavingAccounts((oldArray) => [...oldArray, savingAccount]);
        } else if (savingAccount.account_status === "INACTIVE") {
          setInactiveSavingAccounts((oldArray) => [...oldArray, savingAccount]);
        }
      });
    } catch (error) {
      console.error("Failed to fetch user saving accounts", error);
    }
  };

  const fetchPaymentAccounts = async () => {
    try {
      const response = await getPaymentAccounts(customerId);
      setPaymentAccounts(response.data.result.paymentAccounts);
      console.log(response.data.result);
      // console.log(response.data.result.paymentAccounts[0]);
    } catch (error) {
      console.error("Failed to fetch payment accounts", error);
    }
  };

  const handleWithdraw = async (savingAccount) => {
    response = await withdrawSavingAccount(savingAccount.id)
    if (response.data.status === "OK") {
      fetchUserSavingAccounts();
      fetchPaymentAccounts();
      setWithdrawMessage(response.data.message);
    } else {
      setWithdrawMessage(response.data.message);
    }
  }

  useEffect(() => {
    const fetchInterestRates = async () => {
      try {
        const response = await getAllInterestRates();
        setDepositPackages(response.data.result.interestRateResponses);
        console.log(response.data.result);
      } catch (error) {
        console.error("Failed to fetch interest rates", error);
      }
    };

    fetchUserSavingAccounts();
    fetchPaymentAccounts();
    fetchInterestRates();
  }, []);

  return (
    <SafeAreaView className="bg-gray-200" style={{ flex: 1 }}>
      <ScrollView>
        <View className="flex-col items-center justify-between mb-4 ml-2 mr-2 mt-2 bg-slate-100 py-2 px-2 rounded-md">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center" style={{ width: "70%" }}>
              <FontAwesomeIcon icon={faHandHoldingDollar} size={50} />
              <Text className="font-bold ml-2" style={{ fontSize: 17 }}>
                Term Deposit
              </Text>
            </View>
            <View className="flex-row justify-end" style={{ width: "30%" }}>
              <TouchableOpacity
                className="bg-blue-100 py-2 px-2 rounded-md"
                onPress={toggleAddModal}
              >
                <Text>Saving now</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row items-center">
            <FontAwesomeIcon icon={faFire} size={20} />
            <Text className="ml-2">
              Deposit by terms and receive interest at the end. The longer the
              deposit terms, the higher the interest rate.
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between ml-2 mr-2 mb-3 mt-3">
          <Text className="font-bold" style={{ fontSize: 17 }}>
            Saving Accounts
          </Text>
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
              return (
                <SavingAccountRowView
                  key={savingAccount.id}
                  savingAccount={savingAccount}
                  setSelectedSavingAccount={setSelectedSavingAccount}
                  setsIsAccountDetailsModalVisible={
                    setsIsAccountDetailsModalVisible
                  }
                />
              );
            })}
            {inactiveSavingAccounts.map((savingAccount) => {
              return (
                <SavingAccountRowView
                  key={savingAccount.id}
                  savingAccount={savingAccount}
                  setSelectedSavingAccount={setSelectedSavingAccount}
                  setsIsAccountDetailsModalVisible={
                    setsIsAccountDetailsModalVisible
                  }
                />
              );
            })}
          </>
        )}

        {selectedAccountStatus === "Active" &&
          activeSavingAccounts.map((savingAccount) => {
            return (
              <SavingAccountRowView
                key={savingAccount.id}
                savingAccount={savingAccount}
                setSelectedSavingAccount={setSelectedSavingAccount}
                setsIsAccountDetailsModalVisible={
                  setsIsAccountDetailsModalVisible
                }
              />
            );
          })}

        {selectedAccountStatus === "Inactive" &&
          inactiveSavingAccounts.map((savingAccount) => {
            return (
              <SavingAccountRowView
                key={savingAccount.id}
                savingAccount={savingAccount}
                setSelectedSavingAccount={setSelectedSavingAccount}
                setsIsAccountDetailsModalVisible={
                  setsIsAccountDetailsModalVisible
                }
              />
            );
          })}
      </ScrollView>

      <Modal
        visible={isAddModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleAddModal}
      >
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(1, 1, 1, 0.7)" }}
        >
          <View className="bg-slate-50 rounded-md p-5">
            <View className="flex flex-row justify-between mb-5">
              <Text className="font-bold">Saving Account</Text>
              <TouchableOpacity onPress={toggleAddModal}>
                <FontAwesomeIcon icon={faClose} size={16} />
              </TouchableOpacity>
            </View>
            <View className="grid gap-20">
              <View className="flex-col justify-between">
                <View className="flex-row justify-between items-center mb-3">
                  <Text>Deposit Package</Text>
                  <View style={{ width: "55%" }}>
                    <SelectList
                      setSelected={(val) => {
                        setSelectedDepositPackage(val);
                        console.log("Select interest package id: " + val);
                      }}
                      data={depositPackageData}
                      placeholder="Select a package"
                      save="key"
                      boxStyles={{ borderColor: "#C7C8CC" }}
                    ></SelectList>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mb-3">
                  <View
                    className="flex-col justify-between mb-3"
                    style={{ width: "40%" }}
                  >
                    <Text>Associated Account</Text>
                    <Text>
                      Balance:{" "}
                      {selectedAssociatedAccount &&
                        currencyFormatVN(
                          selectedAssociatedAccount.current_balance
                        )}
                    </Text>
                  </View>
                  <View style={{ width: "55%" }}>
                    <SelectList
                      setSelected={(val) => {
                        setSelectedAssociatedAccount(val);
                        console.log("Select associated account id: " + val);
                      }}
                      data={associatedAccountData}
                      placeholder="Select associated account"
                      searchPlaceholder=""
                      save="key"
                      boxStyles={{ borderColor: "#C7C8CC" }}
                    ></SelectList>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mb-3">
                  <Text>Account Type</Text>
                  <View style={{ width: "55%" }}>
                    <SelectList
                      setSelected={(val) => {
                        setAccountType(val);
                        console.log("Select account type: " + val);
                      }}
                      data={accountTypeData}
                      placeholder={accountType}
                      searchPlaceholder=""
                      save="key"
                      boxStyles={{ borderColor: "#C7C8CC" }}
                    ></SelectList>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mb-3">
                  <Text>Deposit Amount</Text>
                  <View style={{ width: "55%" }}>
                    <TextInput
                      style={{
                        height: 40,
                        width: "100%",
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: "#C7C8CC",
                      }}
                      keyboardType="numeric"
                      value={depositAmount}
                      placeholder="Enter deposit amount"
                      onChangeText={onDepositAmountChanged}
                    />
                  </View>
                </View>
              </View>
              <View>
                <View className="p-2 mb-2">
                  <Text style={{ color: "#ff5252" }}>{errorMessage}</Text>
                  <Text style={{ color: "#b5e550" }}>{successMessage}</Text>
                </View>
                <TouchableOpacity
                  className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black mb-4"
                  onPress={onSubmit}
                >
                  <Text className="text-center text-slate-50 font-bold">
                    Create Saving Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {selectedSavingAccount && depositPackages && (
        <SavingAccountDetailsModal
          isModalVisible={isAccountDetailsModalVisible}
          setIsModalVisible={setsIsAccountDetailsModalVisible}
          savingAccount={selectedSavingAccount}
          interestRates={depositPackages}
          handleWithdraw={handleWithdraw}
          withdrawMessage={withdrawMessage}
          setWithdrawMessage={setWithdrawMessage}
        />
      )}
    </SafeAreaView>
  );
};

export default Savings;
