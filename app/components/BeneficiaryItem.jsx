import { View, Image, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import images from "../assets";


// Author: Dat
// This component is used to display a single beneficiary item
const BeneficiaryItem = ({ name, accountNumber }) => {
  return (
    <View className="justify-between flex-row mt-5 items-center pb-2 px-2 border-b-[1px]">
      <View className="flex flex-row items-center">
        <Image className="w-[35px] h-[35px] mr-2" source={images.avatar} />
        <View>
          <Text className="">{name}</Text>
          <Text className="">{accountNumber}</Text>
        </View>
      </View>
      <FontAwesomeIcon icon={faEllipsisVertical} size={16} />
    </View>
  );
};

export default BeneficiaryItem;
