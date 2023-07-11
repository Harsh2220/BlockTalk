import AsyncStorage from "@react-native-async-storage/async-storage";
import * as XMTP from "@xmtp/react-native-sdk";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { black, white } from "../constants/Colors";
import useClientStore from "../store/clientStore";

export default function index() {
  const { setClient } = useClientStore();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const key = await AsyncStorage.getItem("@xmtp_client");
      if (!key) router.replace("/login");
      if (key) {
        const client = await XMTP.Client.createFromKeyBundle(
          JSON.parse(key),
          "production"
        );
        setClient(client);
        router.replace("/Chats");
      }
    } catch (error) {
      console.log("Error in handleLogin");
    }
  };

  React.useEffect(() => {
    handleLogin();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <ActivityIndicator size={"small"} color={white[300]} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black[700],
    justifyContent: "center",
  },
});
