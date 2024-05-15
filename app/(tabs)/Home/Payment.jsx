import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlus,
  faGreaterThan,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const Payment = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <Text>Payment Account</Text>
            <View>
              <FontAwesomeIcon icon={faPlus} size={25} />
              <Text>Add Account</Text>
            </View>
          </View>
          <View>
            <View>
              <View>
                <FontAwesomeIcon icon={faFileLines} size={25} />
                <Text>123215345</Text>
              </View>
              <View>
                <Text>Available Balance</Text>
                <Text>121212121.00 VND</Text>
              </View>
            </View>
            <FontAwesomeIcon icon={faGreaterThan} size={25} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
