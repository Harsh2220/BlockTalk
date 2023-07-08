import { Stack } from "expo-router";
import React from "react";
import { Web3Modal } from "@web3modal/react-native";


const projectId = "6097f40a8f4f91e37e66cf3a5ca1fba2";

const providerMetadata = {
  name: "YOUR_PROJECT_NAME",
  description: "YOUR_PROJECT_DESCRIPTION",
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
      </Stack>
      <Web3Modal projectId={projectId} providerMetadata={providerMetadata} />
    </>
  );
};

export default StackLayout;
