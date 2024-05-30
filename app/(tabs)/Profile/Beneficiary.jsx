import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import images from "../../assets";

const Beneficiary = () => {
  return (
    <>
      <ScrollView className="pt-5 bg-gray-200 px-2">
        <Text className="mb-3">Interbank Transfer To Accounts</Text>
        <View className="w-full mb-5 bg-slate-50 px-2 pb-8 justify-center rounded-md">
          <View className="justify-between flex-row mt-5 items-center pb-2 px-2 border-b-[1px]">
            <View className="flex flex-row items-center">
              <Image
                className="w-[35px] h-[35px] mr-2"
                source={images.avatar}
              />
              <View>
                <Text className="">Do Quang Trieu</Text>
                <Text className="">8972668719</Text>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faEllipsisVertical} size={16} />
            </TouchableOpacity>
          </View>
          <View className="justify-between flex-row mt-5 items-center pb-2 px-2 border-b-[1px]">
            <View className="flex flex-row items-center">
              <Image
                className="w-[35px] h-[35px] mr-2"
                source={images.avatar}
              />
              <View>
                <Text className="">Do Quang Trieu</Text>
                <Text className="">8972668719</Text>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faEllipsisVertical} size={16} />
            </TouchableOpacity>
          </View>
          <View className="justify-between flex-row mt-5 items-center pb-2 px-2 border-b-[1px]">
            <View className="flex flex-row items-center">
              <Image
                className="w-[35px] h-[35px] mr-2"
                source={images.avatar}
              />
              <View>
                <Text className="">Do Quang Trieu</Text>
                <Text className="">8972668719</Text>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesomeIcon icon={faEllipsisVertical} size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity>
        <View className="w-12 h-12 absolute bottom-8 right-4 bg-black rounded-full justify-center items-center">
          <FontAwesomeIcon icon={faPlus} size={18} color="white" />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Beneficiary;
