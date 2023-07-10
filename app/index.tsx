import { useWeb3Modal } from "@web3modal/react-native";
import * as XMTP from "@xmtp/react-native-sdk";
import React, { useCallback } from "react";
import { Button, View } from "react-native";
import useClientStore from "../store/clientStore";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import parseCircularJSON from "../utils/parseCircularJson";

interface Signer {
  getAddress(): Promise<string>;
  signMessage(message: ArrayLike<number> | string): Promise<string>;
}

export default function index() {
  const { open, isConnected, address, provider } = useWeb3Modal();
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
      console.log("Connecting to XMTP....");

      function getCircularReplacer() {
        const ancestors = [];
        return function (key, value) {
          if (typeof value !== "object" || value === null) {
            return value;
          }
          // `this` is the object that value is contained in,
          // i.e., its direct parent.
          while (ancestors.length > 0 && ancestors.at(-1) !== this) {
            ancestors.pop();
          }
          if (ancestors.includes(value)) {
            return "[Circular]";
          }
          ancestors.push(value);
          return value;
        };
      }

      const XMTPClient = await AsyncStorage.getItem("@xmtp_client");

      // if (XMTPClient) {
      //   const client = parseCircularJSON(XMTPClient);
      //   console.log(client, "parsed");
      //   setClient(client);
      // }

      if (!XMTPClient) {
        const client = await XMTP.Client.create(signer as any, "production");
        await AsyncStorage.setItem(
          "@xmtp_client",
          JSON.stringify(client, getCircularReplacer())
        );
        setClient(client);
        console.log("Clinet", client);
      }
    } catch (error) {
      console.log("Error in connecting To XMTP", error);
    }
  }, []);

  const handleLogin = async () => {
    const XMTPClient = await AsyncStorage.getItem("@xmtp_client");
    if (XMTPClient) {
      setClient(JSON.parse(XMTPClient));
      router.replace("/Chats");
    }
  };

  React.useEffect(() => {
    // handleLogin();
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
        onPress={open}
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
