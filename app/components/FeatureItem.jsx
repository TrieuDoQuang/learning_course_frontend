import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const FeatureItem = ({ title, icon }) => {
  return (
    <View className="items-center">
      <View className="bg-slate-50 rounded-[3px]">
        <TouchableOpacity className="h-[40px] w-[40px] bg-white items-center justify-center rounded-sm">
          <Link
            className
            href={title === "Transfer" ? "/Transfer" : `/Home/${title}/`}
          >
            <FontAwesomeIcon icon={icon} size={25} color="#2B2DE2" />
          </Link>
        </TouchableOpacity>
      </View>
      <Text className="text-slate-50 mt-2">{title}</Text>
    </View>
  );
};

export default FeatureItem;
