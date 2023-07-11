import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import ChatCard from "../../components/Chats/SingleChatItem";
import useClientStore from "../../store/clientStore";
import useConversationStore from "../../store/conversationStore";
import { Conversation } from "@xmtp/react-native-sdk";
import formatAddress from "../../utils/formatAddress";
import { black } from "../../constants/Colors";

const Home = () => {
  const { client } = useClientStore();
  const { conversations, setConversations } = useConversationStore();

  async function getConversations() {
    const conversations = await client?.conversations.list();
    setConversations(conversations);
  }

  React.useEffect(() => {
    getConversations();
  }, []);

  const renderItem = ({ item }: { item: Conversation }) => {
    if (item?.conversationID?.startsWith("lens.dev/dm")) {
      return (
        <ChatCard
          src={""}
          chatName={formatAddress(item?.peerAddress)}
          lastMessage={"iska logic baki hai dostooo"}
          address={item?.peerAddress}
          item={item}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {conversations && (
        <FlatList data={conversations} renderItem={renderItem} />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black[700],
  },
});
