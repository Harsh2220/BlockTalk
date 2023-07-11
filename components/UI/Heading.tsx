import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { FC, useCallback } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { white } from "../../constants/Colors";

interface HeadingProps {
  title: string | React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

SplashScreen.preventAutoHideAsync();

const Heading: FC<HeadingProps> = ({ title, style, ...rest }) => {
  // const [fontsLoaded] = useFonts({
  //   PlusJakartaSans_Regular: require("../../assets/fonts/PlusJakartaSans-Regular.ttf"),
  //   PlusJakartaSans_Medium: require("../../assets/fonts/PlusJakartaSans-Medium.ttf"),
  //   PlusJakartaSans_SemiBold: require("../../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  //   PlusJakartaSans_Bold: require("../../assets/fonts/PlusJakartaSans-Bold.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  const getFontFamily = (fontWeight: number) => {
    switch (fontWeight) {
      case 700:
        return "PlusJakartaSans_Bold";
      case 600:
        return "PlusJakartaSans_SemiBold";
      case 500:
        return "PlusJakartaSans_Medium";
      default:
        return "PlusJakartaSans_Regular";
    }
  };

  // var newStyle = Object.assign({}, style, {
  //   fontFamily: getFontFamily(parseInt(style?.fontWeight)),
  // });

  const defaultStyle = {
    color: white[600],
    fontSize: 18,
  };
  const mergerStyle = {
    ...defaultStyle,
    ...style as any,
  };

  return (
    <Text style={mergerStyle} {...rest}>
      {title}
    </Text>
  );
};

export default Heading;
