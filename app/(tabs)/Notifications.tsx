import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatCard from "../../components/Chats/SingleChatItem";

const Notifications = () => {
  return (
    <View>
      <ChatCard
        src={""}
        chatName={"Stani.lens"}
        lastMessage={"bhai ye 2M le ja na pls "}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
