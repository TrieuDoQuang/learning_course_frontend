import { View, Image, Text, TouchableOpacity } from "react-native";
import images from "../assets";

const Category = ({ reward, setModalVisibility, setSelectedReward }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Select reward: " + JSON.stringify(reward));
        setSelectedReward(reward);
        setModalVisibility(true);
      }}
      className="w-[136px] border-[1.4px] rounded-md shadow-2xl mr-4"
    >
      <View className="h-36">
        <Image
          source={{
            uri: reward.image_link,
          }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        />
      </View>
      <View className="p-1">
        <Text className="mb-2 text-[12px] font-semibold">
          {reward.reward_name}
        </Text>
        <View className="flex-row items-center">
          <Image source={images.pricetag} />
          <Text className="ml-1 text-[11px] font-bold text-blue-400">
            {reward.cost_point} RWP
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Category;
