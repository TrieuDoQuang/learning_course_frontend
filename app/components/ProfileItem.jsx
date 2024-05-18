import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const ProfileItem = ({ title }) => {
  return (
    <View className="w-full bg-slate-50 rounded-lg h-[52px] flex justify-center mb-3">
      <TouchableOpacity className="flex flex-row items-center justify-between p-4">
        <Text>{title}</Text>
        <Link href={`/Profile/${title}`}>
          <FontAwesomeIcon icon={faAngleRight} color="blue" />
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileItem;
