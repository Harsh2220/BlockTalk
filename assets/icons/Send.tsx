import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { memo } from "react";
const Send = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="-0.5 0 25 25"
    width={24}
    height={24}
    {...props}
  >
    <G
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M2.33 8.39C.25 11.82 9.42 14.9 9.42 14.9s3.08 9.17 6.51 7.09c3.64-2.22 8-15.86 5.12-18.72C18.17.41 4.55 4.75 2.33 8.39ZM15.2 9.12 9.42 14.9" />
    </G>
  </Svg>
);
export default React.memo(Send);
