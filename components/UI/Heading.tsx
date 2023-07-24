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
  const [fontsLoaded] = useFonts({
    Outward_Block: require("../../assets/fonts/outward-block.ttf"),
    Outward_Border: require("../../assets/fonts/outward-borders.ttf"),
    Outward_Round: require("../../assets/fonts/outward-round.ttf"),
    WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const getFontFamily = (fontWeight: number) => {
    switch (fontWeight) {
      // case 600:
      //   return "Outward_Round";
      // case 500:
      //   return "Outward_Border";
      default:
        return "WorkSans";
    }
  };

  var newStyle = Object.assign({}, style, {
    // fontFamily: getFontFamily(parseInt(style?.fontWeight)),
  });

  

  return (
    <Text style={newStyle} {...rest} onLayout={onLayoutRootView}>
      {title}
    </Text>
  );
};

export default Heading;
