import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { currencyFormatVN } from "../../../utils/CurrencyUtil";
import { useState } from "react";

const SavingAccountDetailsModal = (props) => {
  const {
    isModalVisible,
    setIsModalVisible,
    savingAccount,
    interestRates,
    handleWithdraw,
    withdrawMessage,
    setWithdrawMessage,
  } = props;

  const toggleModal = () => {
    setWithdrawMessage("")
    setIsModalVisible(!setIsModalVisible);
  };

  let accountInterestRate = null;
  if (interestRates != null) {
    interestRates.forEach((interestRate) => {
      if (interestRate.id === savingAccount.interest_rate_id) {
        accountInterestRate = interestRate;
        return;
      }
    });
  }

  const formatDate = (date) => {
    let formatedDate =
      date[8] +
      date[9] +
      "-" +
      date[5] +
      date[6] +
      "-" +
      date[0] +
      date[1] +
      date[2] +
      date[3];
    return formatedDate;
  };

  const calculateDaysDifference = (startDate, endDate) => {
    let start_date = new Date(startDate);
    let end_date = new Date(endDate);

    let difference_In_Time = end_date.getTime() - start_date.getTime();

    let difference_In_Days = Math.round(
      difference_In_Time / (1000 * 3600 * 24)
    );
    return difference_In_Days - 1;
  };

  const showAlert = () =>
    Alert.alert(
      "Withdraw Confirmation",
      `Are you sure you want to withdraw ${currencyFormatVN(
        savingAccount.saving_initial_amount
      )} from account ${
        savingAccount.account_number
      }, you will lose all the earned interest ${currencyFormatVN(
        savingAccount.saving_current_amount -
          savingAccount.saving_initial_amount
      )}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            console.log("OK Pressed");
            handleWithdraw(savingAccount);
          },
        },
      ],
      { cancelable: false }
    );

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => toggleModal()}
    >
      <View
        className="flex-1 justify-end"
        style={{ backgroundColor: "rgba(1, 1, 1, 0.7)" }}
      >
        <View className="bg-slate-50 rounded-md p-5">
          <View className="flex flex-row justify-between mb-5">
            <Text className="font-bold">Saving Account Details</Text>
            <TouchableOpacity onPress={toggleModal}>
              <FontAwesomeIcon icon={faClose} size={16} />
            </TouchableOpacity>
          </View>
          <View className="grid gap-20">
            <View className="flex-row justify-between">
              <View className="gap-3 text-gray-300">
                <Text>Account Number</Text>
                <Text>Account Status</Text>
                <Text>Account Type</Text>
                <Text>Open Date</Text>
                {savingAccount.account_status === "ACTIVE" && (
                  <Text>Days Left</Text>
                )}
                {savingAccount.account_status === "INACTIVE" && (
                  <Text>Close Date</Text>
                )}
                <Text>Deposit Amount</Text>
                <Text>Current Balance</Text>
                <Text>Interest Rate</Text>
              </View>
              <View className="gap-3">
                <Text className="font-bold">
                  {savingAccount.account_number}
                </Text>
                <Text className="font-bold">
                  {savingAccount.account_status}
                </Text>
                <Text className="font-bold">{savingAccount.account_type}</Text>
                <Text className="font-bold">
                  {formatDate(savingAccount.date_opened)}
                </Text>
                {savingAccount.account_status === "ACTIVE" && (
                  <Text className="font-bold">
                    {accountInterestRate.term * 30 -
                      calculateDaysDifference(
                        savingAccount.date_opened,
                        new Date()
                      )}{" "}
                    days
                  </Text>
                )}
                {savingAccount.account_status === "INACTIVE" && (
                  <Text className="font-bold">
                    {formatDate(savingAccount.date_closed)}
                  </Text>
                )}
                <Text className="font-bold">
                  {currencyFormatVN(savingAccount.saving_initial_amount)}
                </Text>
                <Text className="font-bold">
                  {currencyFormatVN(savingAccount.saving_current_amount)}
                </Text>
                <Text className="font-bold">
                  {accountInterestRate.interest_rate}%
                </Text>
              </View>
            </View>
            <View>
              {savingAccount.account_status === "ACTIVE" && (
                <View>
                  <View className="p-2 mb-2">
                    <Text style={{ color: "#b5e550" }}>{withdrawMessage}</Text>
                  </View>
                  <TouchableOpacity
                    className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black mb-4"
                    onPress={showAlert}
                  >
                    <Text className="text-center text-slate-50 font-bold">
                      Withdraw
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SavingAccountDetailsModal;
