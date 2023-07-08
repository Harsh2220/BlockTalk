import { XMTPProvider } from "@xmtp/react-sdk";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function index() {
  return (
    <View>
      <Link href={"/Home"}>Hello</Link>
    </View>
  );
}
