import React from "react";
import { Image } from "react-native";
type AvatarProps = {
  src: string;
  height: number | string;
  width: number | string;
};

export const FALLBACK_IMAGE = "https://i.pravatar.cc/150?img=47";
const Avatar: React.FC<AvatarProps> = ({ src, height, width }) => {
  return (
    <Image
      source={{
        uri: src ? src : FALLBACK_IMAGE,
      }}
      style={{
        height: height ? height : 24,
        width: width ? width : 24,
        backgroundColor: "white",
        borderRadius: 100,
        padding: 16,
      }}
    />
  );
};
export default  React.memo(Avatar);
