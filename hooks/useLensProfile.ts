import { useEffect, useState } from "react";
import { LENS_API_URL } from "../constants";
import { storage } from "../lib/storage";
import getIPFSLink from "../utils/getIPFSLink";

type ProfileData = {
  handle: string;
  name?: string;
  avatar?: string;
};

const useLensProfile = (ethAddress: string) => {
  const [data, setdata] = useState<ProfileData | null>(null);

  useEffect(() => {
    getLensProfile();
  }, []);

  const getLensProfile = async () => {
    if (ethAddress) {
      const localData = storage.getString(ethAddress);
      if (localData) {
        const jsonData = JSON.parse(localData);
        setdata({
          handle: jsonData?.handle,
          name: jsonData?.name,
          avatar: jsonData?.avatar,
        });
        return;
      }
    }
    try {
      let headersList = {
        "Content-Type": "application/json",
      };

      let gqlBody = {
        query: LENS_PROFILE_QUERY,
        variables: { id: ethAddress },
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
        });
        const LocalJSONData = {
          handle: json?.data?.defaultProfile?.handle,
          name: json?.data?.defaultProfile?.name,
          avatar: getIPFSLink(
            json?.data?.defaultProfile?.picture?.original?.url
          ),
        };
        storage.set(ethAddress, JSON.stringify(LocalJSONData));
      }
    } catch (error) {}
  };
  return { data };
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
