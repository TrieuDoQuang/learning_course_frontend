import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import ChangePasswordData from "../../data/ChangePasswordData";
import Customer from "../../services/CustomerService";
import InputItem from "../../components/InputItem";
import { router } from "expo-router";

const Account = () => {
  const { customerId, logout } = useAuth();
  const [changePasswordData, setChangePasswordData] =
    useState(ChangePasswordData);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(null);
  const { ChangePassword } = Customer();

  const handleChange = useCallback((name, value) => {
    setChangePasswordData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  useEffect(() => {
    const handleChangePassword = async () => {
      const { newPassword, confirmPassword } = changePasswordData;

      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "New password and confirm password do not match");
        return;
      }

      if (
        newPassword.length < 8 ||
        newPassword.length > 20 ||
        !/\d/.test(newPassword) ||
        !/[a-zA-Z]/.test(newPassword) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
      ) {
        Alert.alert(
          "Error",
          "New password does not meet the required conditions"
        );
        return;
      }

      setLoading(true);

      try {
        await ChangePassword(
          {
            current_password: changePasswordData.currentPassword,
            new_password: changePasswordData.newPassword,
            confirm_password: changePasswordData.confirmPassword,
          },
          customerId
        );
        Alert.alert(
          "Success",
          "Password changed successfully",
          [{ text: "OK", onPress: () => router.replace("/Login") }],
          { cancelable: false }
        );
        setChangePasswordData(changePasswordData);
        console.log(ChangePasswordData);
        logout();
      } catch (error) {
        Alert.alert("Error", "Couldn't change password: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    handleChangePassword();
  }, [isSubmit]);

  return (
    <SafeAreaView className="bg-gray-200 flex-1">
      <ScrollView>
        <View className="p-2 my-7">
          <View className="h-[107px] w-full my-5 bg-yellow-50 p-2 justify-center rounded-md">
            <InputItem
              secureTextEntry={true}
              name="currentPassword"
              value={changePasswordData.currentPassword}
              title="Your Current Password"
              handleChange={(value) => handleChange("currentPassword", value)}
            />
          </View>
          <View className="w-full bg-yellow-50 p-2 justify-center rounded-md">
            <View className="mb-3 p-2 bg-blue-200 bg-opacity-20 rounded-md">
              <Text className="font-bold">
                Password must satisfy the following conditions:
              </Text>
              <View className="p-3 gap-2">
                <Text>
                  - The length of the password must be from 8 to 20 characters
                </Text>
                <Text>
                  - Contains at least 1 digit, 1 letter, and 1 special character
                </Text>
              </View>
              <Text>For example: b&1A2c3d; B@123456; 12345678a*</Text>
            </View>
            <InputItem
              secureTextEntry={true}
              title="New Password"
              name="newPassword"
              value={changePasswordData.newPassword}
              handleChange={(value) => handleChange("newPassword", value)}
            />
            <InputItem
              secureTextEntry={true}
              title="Confirm Password"
              name="confirmPassword"
              value={changePasswordData.confirmPassword}
              handleChange={(value) => handleChange("confirmPassword", value)}
            />
            <TouchableOpacity
              className="mt-4 bg-black p-2 flex flex-row rounded-xl h-[48px] items-center justify-center"
              onPress={() => setIsSubmit((value) => !value)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-stone-50 text-center font-bold pr-2">
                  Change Password
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
