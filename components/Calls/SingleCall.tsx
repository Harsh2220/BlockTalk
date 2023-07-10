import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Calls from "../../assets/icons/Calls";
import Avatar, { FALLBACK_IMAGE } from "../Avatar";

type CallCardProps = {
  src: string;
  callerName: string;
  callType: "AUDIO" | "VIDEO";
  timestamp: string;
};

const CallCard: React.FC<CallCardProps> = ({
  src,
  callerName,
  callType,
  timestamp,
}) => {
  const router = useRouter();

  const openFullImage = () => {
    router.push("/fullImage");
    router.setParams({
      uri: src || FALLBACK_IMAGE,
      title: callerName,
    });
  };

  return (
    <TouchableOpacity style={styles.chatCardContainer}>
      <TouchableOpacity style={styles.avatarContainer} onPress={openFullImage}>
        <Avatar src={src ? src : ""} height={52} width={52} />
      </TouchableOpacity>
      <View style={styles.chatDetailsContainer}>
        <Text style={styles.chatHeading}>{callerName}</Text>
      </View>
      <Calls height={25} width={25} />
    </TouchableOpacity>
  );
};

export default CallCard;

const styles = StyleSheet.create({
  chatCardContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  avatarContainer: {
    flex: 0.25,
  },
  chatDetailsContainer: {
    flex: 1,
    justifyContent: "flex-start",
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
