import { create } from "zustand";
import * as XMTP from "@xmtp/react-native-sdk";

interface IClientStore {
    client: null | XMTP.Client;
    setClient: (client: XMTP.Client) => void;
}

const useClientStore = create<IClientStore>((set) => ({
    client: null,
    setClient: (client) => {
        set({
            client: client,
        });
    },
}));

export default useClientStore;