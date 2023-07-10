import { Conversation } from "@xmtp/react-native-sdk";
import { create } from "zustand";

interface IconversationStore {
    conversations: null | Conversation[];
    setConversations: (conversations: Conversation[]) => void;
}

const useConversationStore = create<IconversationStore>((set) => ({
    conversations: null,
    setConversations: (conversations) => {
        set({
            conversations: conversations,
        });
    },
}));

export default useConversationStore;