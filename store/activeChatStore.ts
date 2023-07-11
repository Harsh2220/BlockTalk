import { DecodedMessage } from "@xmtp/react-native-sdk";
import { create } from "zustand";

interface IActiveChatStore {
    id: null | string[];
    topic: null | string[];
    messages: null | DecodedMessage[]
    setId: (id: string[]) => void;
    setTopic: (topic: string[]) => void;
    setMessages: (messages: DecodedMessage[] | null) => void
}

const useActiveChatStore = create<IActiveChatStore>((set) => ({
    id: null,
    topic: null,
    messages: null,
    setId: (id) => {
        set({
            id: id,
        });
    },
    setTopic: (topic) => {
        set({
            topic: topic
        })
    },
    setMessages: (messages) => {
        set({
            messages: messages
        })
    }
}));

export default useActiveChatStore;