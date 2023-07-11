import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
const Chat = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}
  >
    <G
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M7.77 4.58A8.5 8.5 0 0 1 14 2c4.42 0 8 3.1 8 6.92a6.58 6.58 0 0 1-2.93 5.35v2.48" />
      <Path d="M16 13.64c0-3.35-3.13-6.06-7-6.06s-7 2.71-7 6.06a5.78 5.78 0 0 0 2.56 4.68v2.17a1.51 1.51 0 0 0 2.55 1.1l2-1.9c3.83-.07 6.89-2.75 6.89-6.05Z" />
    </G>
  </Svg>
);
export default React.memo(Chat)