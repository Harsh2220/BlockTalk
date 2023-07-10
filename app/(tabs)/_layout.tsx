import { Tabs } from "expo-router";
import React from "react";
import Calls from "../../assets/icons/Calls";
import Chats from "../../assets/icons/Chats";

export default function () {
  return (
    <Tabs>
      <Tabs.Screen
        name="Chats"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Chats
                height={25}
                width={25}
                color={focused ? "black" : "gray"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Calls"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Calls
                height={25}
                width={25}
                color={focused ? "black" : "gray"}
              />
            );
          },
        }}
      />
      <Tabs.Screen name="Notifications" />
    </Tabs>
  );
}
