import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Button, ScrollView } from "react-native";
import { useAuth } from "../../hooks";
import PaymentAccountService from "../../services/PaymentAccountService";
import { Camera } from "expo-camera";
import QRCode from "react-native-qrcode-svg";
import { useFocusEffect, useRouter } from "expo-router";

export default function QR() {
  const { customerId } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const { getDefaultPaymentAccount, getCustomerByAccountNumber } =
    PaymentAccountService();
  const [defaultAccount, setDefaultAccount] = useState({});
  const [scannedAccount, setScannedAccount] = useState({});
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const fetchDefaultAccount = async () => {
        try {
          const response = await getDefaultPaymentAccount(customerId);
          setDefaultAccount(response.data.result);
        } catch (error) {
          console.error("Failed to fetch default account:", error);
        }
      };

      fetchDefaultAccount();
    }, [customerId])
  );

  // const fetchCustomerByAccountNumber = async (accountNumber) => {
  //   console.log("Fetching customer by account number:", accountNumber);
  //   try {
  //     const response = await getCustomerByAccountNumber(accountNumber);
  //     console.log("Fetched Account Response:", response);

  //     // Check if response and response.data.result are defined
  //     if (response && response.data && response.data.result) {
  //       return response.data.result;
  //     } else {
  //       console.error("Invalid response structure:", response);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch customer name:", error);
  //     return null;
  //   }
  // };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log("Scanned Data:", data);
    setScanned(true);
    setText(data);

    router.push({
      pathname: `/Transfer`,
      params: data,
    });
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
          }}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {!isScanning ? (
            <View>
              <Text style={styles.title}>QR Code Generator</Text>
              <View style={styles.qrCode}>
                <QRCode
                  value={defaultAccount.account_number}
                  size={200}
                  color="black"
                  backgroundColor="white"
                />
              </View>
            </View>
          ) : (
            <>
              <View style={{ alignItems: "center" }}>
                <Camera
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={{ height: 400, width: 400 }}
                />
              </View>
              <Text style={{ textAlign: "center" }}>{text}</Text>

              {scanned && (
                <Button
                  title={"Scan again?"}
                  onPress={() => setScanned(false)}
                  color="tomato"
                />
              )}
            </>
          )}
        </View>
        <Button
          title={!isScanning ? "Scan QR " : "Back to QR Code"}
          onPress={() => setIsScanning(!isScanning)}
          style={{ display: isScanning ? "none" : "flex", padding: 10 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    marginTop: 100,
    marginVertical: 100,
  },
  wrapper: {
    maxWidth: 300,
    backgroundColor: "#fff",
    borderRadius: 7,
    padding: 20,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  title: {
    fontSize: 21,
    fontWeight: "500",
    marginBottom: 10,
  },
  qrCode: {
    marginTop: 20,
    alignItems: "center",
  },
});
