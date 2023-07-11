import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import * as XMTP from "@xmtp/react-native-sdk";
import { Link, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Button, View } from "react-native";
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
      return address;
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
    const key = await AsyncStorage.getItem("@xmtp_client");
    const client = await XMTP.Client.createFromKeyBundle(
      JSON.parse(key),
      "production"
    );
    if (client) {
      setClient(client);
      router.replace("/Chats");
    }
  };

  React.useEffect(() => {
    handleLogin();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: "80%",
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <Button
        onPress={() => {
          open();
        }}
        title={isConnected ? "Connected" : "Connect Wallet"}
      />
      {isConnected && <Button title="Enable Chat" onPress={handleConnect} />}
      <View
        style={{
          marginVertical: 16,
        }}
      >
        <Link href={"/Chats"}>Go To Chats</Link>
      </View>
    </View>
  );
}
