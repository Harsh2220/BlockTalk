import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import * as XMTP from "@xmtp/react-native-sdk";
import { Link, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { ActivityIndicator, Button, StyleSheet, View } from "react-native";
import { black, white } from "../constants/Colors";
import useClientStore from "../store/clientStore";

interface Signer {
  getAddress(): Promise<string>;
  signMessage(message: ArrayLike<number> | string): Promise<string>;
}

export default function index() {
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const { setClient } = useClientStore();
  const router = useRouter();

  const signer: Signer = {
    getAddress: function (): Promise<string> {
      return new Promise((res, rej) => {
        res(address);
      });
    },
    signMessage: function (
      message: ArrayLike<number> | string
    ): Promise<string> {
      return provider?.request({
        method: "personal_sign",
        params: [address, message],
      });
    },
  };

  const handleConnect = useCallback(async () => {
    try {
      const client = await XMTP.Client.create(signer as any, "production");
      const key = await client.exportKeyBundle();
      await AsyncStorage.setItem("@xmtp_client", JSON.stringify(key));
      setClient(client);
      router.replace("/Chats");
    } catch (error) {
      console.log("Error in connecting To XMTP", error);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const key = await AsyncStorage.getItem("@xmtp_client");
      if (!key) router.replace("/login");
      if (key) {
        const client = await XMTP.Client.createFromKeyBundle(
          JSON.parse(key),
          "production"
        );
        // return
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
    <View style={styles.container}>
      <ActivityIndicator size={"small"} color={white[300]} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black[700],
    justifyContent: "center",
    alignItems: "center",
  },
});
