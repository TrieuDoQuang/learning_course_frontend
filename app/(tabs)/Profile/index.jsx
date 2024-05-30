import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSimCard,
  faCopy,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import images from "../../assets";
import { ProfileItem } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useAuth } from "../../hooks";
import { useState, useEffect } from "react";
import { CustomerService } from "../../services";

const Profile = () => {
  const [customerData, setCustomerData] = useState([]);
  const { getCustomerById } = CustomerService();
  const { customerId } = useAuth();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getCustomerById(customerId);
        setCustomerData(response.data.result);
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleLogout = () => {
    authContext.logout();
    router.replace("/Login");
  };

  return (
    <SafeAreaView className="h-full bg-gray-200">
      <ScrollView>
        <View className="mb-10">
          <View className="">
            <View className=" border-1 bg-white shadow-lg w-full h-[285px] flex justify-center items-center  ">
              <Text className="text-center pb-4 text-[20px] font-bold ">
                Profile
              </Text>
              <ImageBackground source={images.background} borderRadius={10}>
                <View className="w-[315px] h-[180px] rounded-md">
                  <View className="p-6 flex gap-3">
                    <View className="flex flex-row justify-between items-center">
                      <Text className="text-slate-50 font-bold text-xl">
                        {customerData?.name}
                      </Text>
                      <Text className="text-slate-50 uppercase italic">
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
                      <Text className="text-slate-50 mr-10 font-bold text-sm">
                        35-070-0003-3256-2022
                      </Text>
                      <TouchableOpacity className="flex flex-row pl-2 gap-1">
                        <FontAwesomeIcon
                          icon={faCopy}
                          color="color: rgb(156 163 175)"
                        />
                        <Text className="text-gray-400">Copy</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text className="text-gray-400">Exp. 12/26</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View className="px-6">
            <ProfileItem title="Account" />
            <ProfileItem title="Beneficiary" />
            <ProfileItem title="Security" />
            <ProfileItem title="Settings" />
            <ProfileItem title="Help Center" />
            <TouchableOpacity
              className="w-[315px] bg-white mt-3 rounded-lg h-[40px] flex justify-center mb-2 border-red-600 border items-center"
              onPress={handleLogout}
            >
              <Text className="text-red-600"> Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
