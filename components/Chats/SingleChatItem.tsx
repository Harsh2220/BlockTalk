import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Avatar, { FALLBACK_IMAGE } from "../Avatar";

type ChatCardProps = {
  src: string;
  chatName: string;
  lastMessage: string;
  address: string;
};

const ChatCard: React.FC<ChatCardProps> = ({
  src,
  chatName,
  lastMessage,
  address,
}) => {
  const router = useRouter();

  const openFullImage = () => {
    router.push("/fullImage");
    router.setParams({
      uri: src || FALLBACK_IMAGE,
      title: chatName,
    });
  };

  const goToSingleChat = () => {
    router.push("/singlechat");
    router.setParams({
      chatName: chatName,
      address: address,
    });
  };

  return (
    <TouchableOpacity style={styles.chatCardContainer} onPress={goToSingleChat}>
      <TouchableOpacity onPress={openFullImage}>
        <Avatar src={src ? src : ""} height={52} width={52} />
      </TouchableOpacity>
      <View style={styles.chatDetailsContainer}>
        <Text style={styles.chatHeading}>{chatName}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  chatCardContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  chatDetailsContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  },
  chatHeading: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
  },
  lastMessage: {
    color: "gray",
    fontSize: 14,
    fontWeight: "400",
  },
});
