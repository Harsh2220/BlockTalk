import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ChatMessageProps = {
  message: string;
  timestamp: string;
  avatarSrc: string;
  isSender: boolean;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  avatarSrc,
  message,
  timestamp,
  isSender,
}) => {
  return (
    <View style={isSender ? styles.receiver : styles.sender}>
      <Text style={isSender ? styles.senderText : styles.receiverText}>
        {message}
      </Text>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  sender: {
    padding: 12,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 12,
    maxWidth: "80%",
    color: "black",
    position: "relative",
  },
  receiver: {
    padding: 12,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 12,
    marginBottom: 18,
    maxWidth: "80%",
    position: "relative",
  },
  receiverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderText: {
    fontWeight: "500",
    marginLeft: 15,
    marginBottom: 15,
    color: "black",
  },
});
