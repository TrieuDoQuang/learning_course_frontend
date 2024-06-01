import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from "react-native";
import { currencyFormatVN } from "../../../utils/CurrencyUtil";
import { useState } from "react";

const RewardDetailsModal = (props) => {
  const {
    isModalVisible,
    setIsModalVisible,
    reward,
    handleRedeem,
    handleUse,
    actionMessage,
    setActionMessage,
    isActionSuccess,
  } = props;

  const toggleModal = () => {
    setActionMessage("");
    setIsModalVisible(!setIsModalVisible);
  };

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
            <Text className="font-bold">Voucher Details</Text>
            <TouchableOpacity onPress={toggleModal}>
              <FontAwesomeIcon icon={faClose} size={16} />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="w-[125px] h-[125px] mr-3">
              <Image
                source={{
                  uri: reward.image_link,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "stretch",
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              />
            </View>
            <View className="flex-col justify-between" style={{ width: "50%" }}>
              <Text className="self-start" style={{ overflow: "hidden" }}>
                {reward.reward_name}
              </Text>
              <Text className="self-start">
                Cost: {reward.cost_point} points
              </Text>
              <Text className="self-start">Type: {reward.reward_type}</Text>
              {reward.payment_account_id && (
                <Text className="self-start">
                  Available: {reward.is_valid ? "Yes" : "No"}
                </Text>
              )}
            </View>
          </View>
          <View>
            <View className="p-2 mb-2">
              {!isActionSuccess ? (
                <Text style={{ color: "#ff5252" }}>{actionMessage}</Text>
              ) : (
                <Text style={{ color: "#b5e550" }}>{actionMessage}</Text>
              )}
            </View>

            {reward.payment_account_id ? (
              <>
                {reward.is_valid && (
                  <TouchableOpacity
                    className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black mb-4"
                    onPress={handleUse}
                  >
                    <Text className="text-center text-slate-50 font-bold">
                      Use
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <TouchableOpacity
                className="h-[48px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black mb-4"
                onPress={handleRedeem}
              >
                <Text className="text-center text-slate-50 font-bold">
                  Redeem
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RewardDetailsModal;
