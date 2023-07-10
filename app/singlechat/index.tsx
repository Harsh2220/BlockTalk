import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Send from "../../assets/icons/Send";
import ChatMessage from "../../components/Chats/ChatMessage";



const SingleChat = ({}) => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.chatName,
    });
  }, []);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
          <ChatMessage
            message={"abe kaha hai "}
            timestamp={"45"}
            avatarSrc={""}
            isSender={true}
          />
          <ChatMessage
            message={"Bolo bhai"}
            timestamp={"45"}
            avatarSrc={""}
            isSender={false}
          />
          <ChatMessage
            message={"vo mere pese kab de raha hai"}
            timestamp={"45"}
            avatarSrc={""}
            isSender={true}
          />
        </ScrollView>
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
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 5,
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
