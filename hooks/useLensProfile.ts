import { useEffect, useState } from "react";
import { LENS_API_URL } from "../constants";
import { storage } from "../lib/storage";
import getIPFSLink from "../utils/getIPFSLink";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";

type ProfileData = {
  handle: string;
  name?: string;
  avatar?: string;
  profileId?: string;
};

const useLensProfile = (ethAddress: string, owner ?: boolean) => {
  const [data, setdata] = useState<ProfileData | null>(null);
  
  const {address } = useWalletConnectModal();

  useEffect(() => {
    if (owner){
      return;
    }
    getLensProfile();
  }, []);

  const getLensProfile = async () => {
  console.log(ethAddress);
    if (ethAddress) {
      const localData = storage.getString(owner?address:ethAddress);
      if (localData) {
        console.log("MMKV CALL")
        const jsonData = JSON.parse(localData);
        setdata({
          handle: jsonData?.handle,
          name: jsonData?.name,
          avatar: jsonData?.avatar,
          profileId: jsonData?.profileId
        });
        return;
      }
    }
    console.log("API CALL",ethAddress)
    try {
      let headersList = {
        "Content-Type": "application/json",
      };

      let gqlBody = {
        query: LENS_PROFILE_QUERY,
        variables: { id: owner?address:ethAddress },
      };

      let bodyContent = JSON.stringify(gqlBody);

      let response = await fetch(LENS_API_URL, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      const json = await response.json();
      if (json) {
        setdata({
          handle: json?.data?.defaultProfile?.handle,
          name: json?.data?.defaultProfile?.name,
          avatar: getIPFSLink(
            json?.data?.defaultProfile?.picture?.original?.url
          ),
          profileId: json?.data?.defaultProfile?.id
        });
        const LocalJSONData = {
          handle: json?.data?.defaultProfile?.handle,
          name: json?.data?.defaultProfile?.name,
          avatar: getIPFSLink(
            json?.data?.defaultProfile?.picture?.original?.url
          ),
          profileId: json?.data?.defaultProfile?.id
        };
        storage.set(owner?address:ethAddress, JSON.stringify(LocalJSONData));
      }
    } catch (error) {}
  };
  return { data, getLensProfile };
};

export default useLensProfile;

const LENS_PROFILE_QUERY = `query Profile($id:EthereumAddress!){
 defaultProfile(request:{ethereumAddress:$id}){
	id
    name
    handle
    picture{
      __typename
      ... on NftImage{
        uri
      }
      ... on MediaSet{
        original{
          url
        }
        optimized{
          url
        }
      }
    }
}
}`;
