import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import ChatCard from "../../components/Chats/SingleChatItem";
import useClientStore from "../../store/clientStore";
import useConversationStore from "../../store/conversationStore";
import { Conversation } from "@xmtp/react-native-sdk";
import formatAddress from "../../utils/formatAddress";

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
    return (
      <ChatCard
        src={""}
        chatName={formatAddress(item?.peerAddress)}
        lastMessage={"bhai ye 2M le ja na pls "}
        address={item?.peerAddress}
      />
    );
  };

  return (
    <View>
      {conversations && (
        <FlatList data={conversations} renderItem={renderItem} />
      )}
    </View>
  );
};

export default Home;
