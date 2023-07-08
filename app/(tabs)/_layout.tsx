import { Tabs } from "expo-router";
import React from "react";

export default function () {
  return (
    <Tabs>
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Search" />
    </Tabs>
  );
}
