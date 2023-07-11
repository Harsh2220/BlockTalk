import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { black, white } from "../../constants/Colors";
import * as XMTP from "@xmtp/react-native-sdk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "../../constants/StorageKeys";
import useClientStore from "../../store/clientStore";
import { useRouter } from "expo-router";
import Heading from "../../components/UI/Heading";
import Button from "../../components/UI/Button";
import formatAddress from "../../utils/formatAddress";

interface Signer {
  getAddress(): Promise<string>;
  signMessage(message: ArrayLike<number> | string): Promise<string>;
}

const Login = () => {
  const router = useRouter();
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const { setClient } = useClientStore();

  const signer: Signer = {
    getAddress: function (): Promise<string> {
      return new Promise((resolve, reject) => {
        resolve(address);
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
      await AsyncStorage.setItem(StorageKeys.XMTPClient, JSON.stringify(key));
      setClient(client);
      router.replace("/Chats");
    } catch (error) {
      console.log("Error in connecting To XMTP", error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Heading title={"Welcome to DeChat"} style={{ fontSize: 22 }} />
      </View>
      <View>
        {isConnected ? (
          <View>
            <Heading
              title={`Connected to Wallet :${formatAddress(address)}`}
              style={{ marginVertical: 8 }}
            />
            <Button
              title={"Enable XMTP"}
              textStyle={{ textAlign: "center" }}
              onPress={handleConnect}
            />
          </View>
        ) : null}
      </View>
      <View>
        {!isConnected ? (
          <Button title={"Connect Wallet"} my={4} onPress={open} />
        ) : null}
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black[700],
    justifyContent: "center",
    alignItems: "center",
  },
});
