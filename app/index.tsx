
import { useWeb3Modal } from "@web3modal/react-native";
import { Link } from "expo-router";

import React from "react";
import { Button, View } from "react-native";

export default function index() {

  const { open, isConnected, address, isOpen, close } = useWeb3Modal();

  return (
    <View>
      <Link href={"/Home"}>
        <Button onPress={open} title="Connect Wallet" />
      </Link>
    </View>
  );
}
