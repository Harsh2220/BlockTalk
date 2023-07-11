import { WalletConnectModal } from '@walletconnect/modal-react-native';

import { Stack } from "expo-router";
import React from "react";
import { isAndroid } from "../constants/platform";
const projectId = "6097f40a8f4f91e37e66cf3a5ca1fba2";

const providerMetadata = {
  name: "DeChat",
  description: "Decentralized Chat",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const StackLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="settings/index"
          options={{
            headerTitle: "Settings",
          }}
        />
        <Stack.Screen
          name="singlechat/index"
          options={{
            title: "Single Chat",
            animation: isAndroid ? "fade_from_bottom" : "default",
          }}
        />
        <Stack.Screen
          name="fullImage/index"
          options={{
            presentation: "transparentModal",
            headerShown: false,
            title: "Single Chat",
            animation: "default",
          }}
        />
      </Stack>
      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </>
  );
};

export default StackLayout;
