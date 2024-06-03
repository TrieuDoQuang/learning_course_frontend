import { View, Text, Image } from "react-native";


// Author: Dat
// This component is used to display a single transaction item
const TransactionItem = ({ image, name, date, amount }) => {
  return (
    <View className="w-full rounded-md h-[60px] flex flex-row bg-slate-50 py-1 px-2 my-2">
      <View className="flex flex-column justify-center mr-4">
        <Image className={"w-[45px] h-[45px]"} source={image} />
      </View>
      <View className="flex flex-row justify-between w-full">
        <View className="flex flex-col justify-between">
          <Text className="text-xs font-bold">Transfer to</Text>
          <Text className="text-xs max-h-[20px]">{name}</Text>
          <Text className="text-xs font-light">{date}</Text>
        </View>
        <View className="flex flex-col justify-center mr-1">
          <Text className="font-bold">{amount} VND</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionItem;
