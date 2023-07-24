import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Button from "../../components/UI/Button";
import { black } from "../../constants/Colors";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "../../constants/StorageKeys";
import { useRouter } from "expo-router";

const Settings = () => {
  const {provider} = useWalletConnectModal();
  const router = useRouter();
  const logout = async () => {
    await provider?.disconnect();
    await AsyncStorage.removeItem(StorageKeys.XMTPClient);
    await AsyncStorage.removeItem(StorageKeys.UserAddress);
    router.replace('login');
  }
  return (
    <View style={styles.container}>
      <View>
          <Button title={"Logout"} py={8} onPress={logout} textStyle={{fontSize: 12}}/>
      </View>
    </View>
  );
};

export default Settings;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black[700],
    justifyContent: "center",
    alignItems: "center",
  },
});
