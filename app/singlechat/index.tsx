import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Send from "../../assets/icons/Send";
import ChatMessage from "../../components/Chats/ChatMessage";
import useClientStore from "../../store/clientStore";
import useActiveChatStore from "../../store/activeChatStore";
import { DecodedMessage } from "@xmtp/react-native-sdk";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";

const SingleChat = ({}) => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { client } = useClientStore();
  const { id, topic, messages, setMessages } = useActiveChatStore();
  const { address } = useWalletConnectModal();

  async function getMessages() {
    const messages = await client.listBatchMessages(topic, id);
    setMessages(messages);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.chatName,
    });
    getMessages();
    return () => {
      setMessages(null);
    };
  }, []);

  const renderItem = ({ item }: { item: DecodedMessage }) => {
    return (
      <ChatMessage
        message={item?.content}
        timestamp={"67"}
        avatarSrc={""}
        isSender={address === item?.senderAddress}
      />
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        {messages ? (
          <FlatList
            data={messages}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingVertical: 16,
            }}
            inverted={true}
          />
        ) : (
          <ActivityIndicator size={"small"} />
        )}
        <View style={styles.footer}>
          <TextInput
            autoFocus={false}
            placeholder="Type your message here"
            selectionColor={"black"}
            style={styles.textinput}
          />
          <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
            <Send height={25} width={25} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SingleChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  footer: {
    bottom: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 16,
  },
  textinput: {
    flex: 1,
    bottom: 0,
    height: 40,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "black",
    borderRadius: 30,
  },
});
