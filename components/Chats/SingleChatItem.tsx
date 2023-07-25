import { Conversation } from "@xmtp/react-native-sdk";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useLensProfile from "../../hooks/useLensProfile";
import formatAddress from "../../utils/formatAddress";
import Avatar, { FALLBACK_IMAGE } from "../Avatar";
import useActiveChatStore from "../../store/activeChatStore";
import useClientStore from "../../store/clientStore";

type ChatCardProps = {
  src: string;
  chatName: string;
  lastMessage: string;
  address: string;
  item: Conversation;
};

const ChatCard: React.FC<ChatCardProps> = ({
  src,
  chatName,
  lastMessage,
  address,
  item,
}) => {
  const { data } = useLensProfile(item?.peerAddress);
  const router = useRouter();
  const { setId, setTopic } = useActiveChatStore();
  const { client } = useClientStore();
  const [latest, setLatest] = useState('');
  const PROFILE_PIC_URI = data?.avatar;

  useEffect(()=>{
   getLatestMessage();
  })

  const getLatestMessage = async () => {
    const messages = await client.listBatchMessages([item?.topic], [item?.conversationID]);
  
    setLatest(messages[0]?.content);
  }

  const openFullImage = () => {
    router.push("/fullImage");
    router.setParams({
      uri: PROFILE_PIC_URI || FALLBACK_IMAGE,
      title: data?.handle || chatName,
    });
  };

  const goToSingleChat = () => {
    setId([item?.conversationID]);
    setTopic([item?.topic]);
    router.push("/singlechat");
    router.setParams({
      chatName: data?.handle || chatName,
      address: address,
      profileId: data?.profileId
    });
  };

  return (
    <TouchableOpacity style={styles.chatCardContainer} onPress={goToSingleChat}>
      <TouchableOpacity onPress={openFullImage}>
        <Avatar src={PROFILE_PIC_URI} height={52} width={52} />
      </TouchableOpacity>
      <View style={styles.chatDetailsContainer}>
        <Text style={styles.chatHeading}>
          {data?.handle || data?.name || formatAddress(item?.peerAddress)}
        </Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {latest}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ChatCard);

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
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  lastMessage: {
    color: "gray",
    fontSize: 14,
    fontWeight: "400",
  },
});
