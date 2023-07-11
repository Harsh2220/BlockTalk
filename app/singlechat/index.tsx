import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { DecodedMessage } from "@xmtp/react-native-sdk";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  InteractionManager,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Send from "../../assets/icons/Send";
import ChatMessage from "../../components/Chats/ChatMessage";
import { black, white } from "../../constants/Colors";
import { isIOS } from "../../constants/platform";
import useActiveChatStore from "../../store/activeChatStore";
import useClientStore from "../../store/clientStore";

const SingleChat = ({}) => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { client } = useClientStore();
  const { id, topic, messages, setMessages } = useActiveChatStore();
  const { address } = useWalletConnectModal();

  const [inputMessage, setInputMessage] = useState("");
  async function getMessages() {
    const messages = await client.listBatchMessages(topic, id);
    setMessages(messages);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.chatName,
    });
    InteractionManager.runAfterInteractions(() => {
      getMessages();
    });
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
        behavior={isIOS ? "padding" : "height"}
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
          <View
            style={[
              styles.container,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <ActivityIndicator size={"small"} color={white[300]} />
          </View>
        )}
        <View style={styles.footer}>
          <TextInput
            autoFocus={false}
            placeholder="Type your message here"
            placeholderTextColor={"gray"}
            selectionColor={"white"}
            style={styles.textinput}
            onChange={(e) => {
              setInputMessage(e.nativeEvent.text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              Alert.alert(inputMessage);
            }}
            activeOpacity={0.5}
          >
            <Send
              height={25}
              width={25}
              fill={inputMessage.length > 0 ? "white" : "gray"}
            />
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
    backgroundColor: black[700],
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
    backgroundColor: black[400],
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderRadius: 30,
  },
});
