import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import React, { useCallback } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { black, white } from "../../constants/Colors";
import * as XMTP from "@xmtp/react-native-sdk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "../../constants/StorageKeys";
import useClientStore from "../../store/clientStore";
import { useRouter } from "expo-router";
import Heading from "../../components/UI/Heading";
import Button from "../../components/UI/Button";
import formatAddress from "../../utils/formatAddress";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import StyledText from "../../components/UI/StyledText";

interface Signer {
  getAddress(): Promise<string>;
  signMessage(message: ArrayLike<number> | string): Promise<string>;
}

const Login = () => {
  const router = useRouter();
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const { setClient } = useClientStore();

  const windowHeight = Dimensions.get("window").height;

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
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#744ea3", "black"]} style={styles.container}>
        <View
          style={{
            width: "100%",
            flex: 0.8,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: windowHeight / 3.3,
                width: windowHeight / 3.3,
              }}
            >
              <Image
                source={require("../../assets/Login.png")}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Heading
              title={"Welcome"}
              style={{ fontSize: 40, color: white[400], fontWeight: "800" }}
            />
            <Heading
              title={"to BlockTalk"}
              style={{
                fontSize: 40,
                color: white[400],
                fontWeight: "800",
                marginTop: -4,
              }}
            />
            <StyledText
              title={"Empowering Conversations. Discover. Connect. Unleash"}
              style={{ color: white[400], fontSize: 16, marginTop: 8 }}
            />
          </View>
        </View>
      </LinearGradient>

      <View
        style={{
          flex: 0.2,
          backgroundColor: "black",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          {!isConnected ? (
            <Button
              title={"Connect Wallet"}
              my={4}
              py={12}
              onPress={open}
              textStyle={{
                color: black[600],
                fontWeight: "600",
                fontSize: 20,
              }}
              bg={white[600]}
              borderRadius={10}
            />
          ) : (
            <View>
              <Heading
                title={`Connected to Wallet :${formatAddress(address)}`}
                style={{ marginVertical: 8, color: "white" }}
              />
              <Button
                title={"Enable XMTP"}
                my={4}
                py={12}
                textStyle={{
                  color: black[600],
                  fontWeight: "500",
                  fontSize: 20,
                }}
                bg={white[600]}
                borderRadius={10}
                onPress={handleConnect}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: black[700],
    justifyContent: "space-around",
    alignItems: "center",
  },
});
