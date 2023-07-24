import { Tabs, useRouter } from "expo-router";
import React from "react";
import Calls from "../../assets/icons/Calls";
import Chats from "../../assets/icons/Chats";
import { black, white } from "../../constants/Colors";
import Settings from "../../assets/icons/Settings";
import { Pressable, View } from "react-native";

export default function () {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: black[400],
        },
        headerShadowVisible: false,
        headerTintColor: white[400],
        tabBarStyle: {
          backgroundColor: black[700],
          borderTopColor: black[700],
        },
      }}
    >
      <Tabs.Screen
        name="Calls"
        options={{
          tabBarIcon: ({ focused }) => {
            return <Calls height={25} width={25} color={"white"} />;
          },
        }}
      />
      <Tabs.Screen
        name="Chats"
        options={{
          tabBarIcon: ({ focused }) => {
            return <Chats height={25} width={25} color={"white"} />;
          },
          headerRight: () => {
            return (
              <View
                style={{
                  paddingRight: 8,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={() => {
                    router.push("/settings");
                  }}
                >
                  <Settings height={32} width={32} />
                </Pressable>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen name="Notifications" />
    </Tabs>
  );
}
