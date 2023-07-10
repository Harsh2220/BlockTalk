import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import ChatCard from "../../components/Chats/SingleChatItem";

const Home = () => {
  return (
    <View>
      <ChatCard
        src={""}
        chatName={"Stani.lens"}
        lastMessage={"bhai ye 2M le ja na pls "}
      />
      <ChatCard
        src={""}
        chatName={"iamvivek.lens"}
        lastMessage={"ye dekho :)"}
      />
      <ChatCard
        src={""}
        chatName={"vitalik.eth"}
        lastMessage={"Brooo,sent 1eth, check "}
      />
    </View>
  );
};

export default Home;
