import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";


// Author: Trieu
// This component is used to display a notification message
const Notification = ({ type = "success", message = "" }) => {
  const slideAnim = useRef(new Animated.Value(-50)).current; // Initial value for Y position
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity

  useEffect(() => {
    // Slide in from the top
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 40, // Position to slide to
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // Wait for 2.5 seconds
      Animated.delay(2500),
      // Fade out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 500,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [slideAnim, fadeAnim]);

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.notificationContainer,
        { transform: [{ translateY: slideAnim }], opacity: fadeAnim },
      ]}
    >
      {type === "success" && (
        <View style={[styles.notification, styles.success]}>
          <FontAwesomeIcon
            icon={faCircleCheck}
            color="green"
            size={20}
            style={styles.icon}
          />
          <Text style={styles.message}>{message}</Text>
        </View>
      )}
      {type === "error" && (
        <View style={[styles.notification, styles.error]}>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            color="red"
            size={20}
            style={styles.icon}
          />
          <Text style={{ color: "#991b1b", fontSize: 14, width: 230 }}>{message}</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    width: 300,
    zIndex: 10001,
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
  success: {
    backgroundColor: "#dcfce7",
    borderColor: "#c3e6cb",
    borderWidth: 1,
  },
  error: {
    backgroundColor: "#fee2e2",
    borderColor: "#f5c6cb",
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  message: {
    fontSize: 14,
    color: "#166534",
    width: 230
  },
});

export default Notification;
