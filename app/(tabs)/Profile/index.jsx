import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSimCard,
  faCopy,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Profile = () => {
  return (
    <SafeAreaView className="h-full bg-gray-200">
      <ScrollView>
        <View>
          <View className="p-[9px]">
            <View className=" border-1 bg-white shadow-lg w-full h-[285px] flex justify-center items-center  ">
              <Text className="text-center pb-4 text-[20px] font-bold ">
                Profile
              </Text>
              <View className=" bg-gray-100 w-[315px] h-[180px] rounded-lg">
                <View className="p-6 flex gap-3">
                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-white font-bold text-xl">
                      Do Quang Trieu
                    </Text>
                    <Text className="text-white uppercase italic">
                      {" "}
                      TDK BANK
                    </Text>
                  </View>
                  <View>
                    <FontAwesomeIcon
                      icon={faSimCard}
                      color="yellow"
                      size={20}
                    />
                  </View>
                  <View className="flex flex-row">
                    <Text className="text-white font-bold text-sm">
                      35-070-0003-3256-2022
                    </Text>
                    <TouchableOpacity className="flex flex-row pl-2 gap-1">
                      <FontAwesomeIcon icon={faCopy} color="gray" />
                      <Text className="text-gray-500">Copy</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text className="text-gray-500">Exp. 12/26</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="p-[9px]">
            <View className="w-full bg-white rounded-lg h-[56px] flex justify-center mb-2">
              <TouchableOpacity>
                <Link href="Profile/Account">
                  <View className="flex flex-row items-center justify-between p-4">
                    <Text>Account</Text>
                    <FontAwesomeIcon icon={faAngleRight} color="blue" />
                  </View>
                </Link>
              </TouchableOpacity>
            </View>
            <View className="w-full bg-white rounded-lg h-[56px] flex justify-center mb-2">
              <TouchableOpacity className="flex flex-row items-center justify-between p-4">
                <Text>Debit Card Setting</Text>
                <FontAwesomeIcon icon={faAngleRight} color="blue" />
              </TouchableOpacity>
            </View>
            <View className="w-full bg-white rounded-lg h-[56px] flex justify-center mb-2">
              <TouchableOpacity className="flex flex-row items-center justify-between p-4">
                <Text>Security</Text>
                <FontAwesomeIcon icon={faAngleRight} color="blue" />
              </TouchableOpacity>
            </View>
            <View className="w-full bg-white rounded-lg h-[56px] flex justify-center mb-2">
              <TouchableOpacity className="flex flex-row items-center justify-between p-4">
                <Text>Language</Text>
                <FontAwesomeIcon icon={faAngleRight} color="blue" />
              </TouchableOpacity>
            </View>
            <View className="w-full bg-white rounded-lg h-[56px] flex justify-center mb-2">
              <TouchableOpacity className="flex flex-row items-center justify-between p-4">
                <Text>FAQ</Text>
                <FontAwesomeIcon icon={faAngleRight} color="blue" />
              </TouchableOpacity>
            </View>
            <View className="w-full bg-white rounded-lg h-[56px] flex justify-center mb-2">
              <TouchableOpacity className="flex flex-row items-center justify-between p-4">
                <Text>Help Center</Text>
                <FontAwesomeIcon icon={faAngleRight} color="blue" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="w-[315px] bg-white mx-[15px] rounded-lg h-[40px] flex justify-center mb-2 border-red-600 border items-center">
              <Text className="text-red-600"> Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
