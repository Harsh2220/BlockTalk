import * as XMTP from "@xmtp/react-native-sdk";
import { useWeb3Modal } from "@web3modal/react-native";
import React, { useCallback } from "react";
import { Button, View } from "react-native";

interface Signer {
  getAddress(): Promise<string>;
  signMessage(message: ArrayLike<number> | string): Promise<string>;
}

export default function index() {
  const { open, isConnected, address, provider } = useWeb3Modal();

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

      if (signer) {
        const client = await XMTP.Client.create(signer, "dev");
        console.log("Clinet", client);
      }
    } catch (error) {
      console.log("Error in connecting To XMTP", error);
    }
  }, []);

  return (
    <View>
      <View style={{ width: "80%", alignSelf: "center" }}>
        <Button
          onPress={open}
          title={isConnected ? "Connected" : "Connect Wallet"}
        />
        {isConnected && <Button title="Enable Chat" onPress={handleConnect} />}
      </View>
    </View>
  );
}
