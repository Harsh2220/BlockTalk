import { useFonts } from "expo-font";
import React, { FC, useCallback } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import * as SplashScreen from "expo-splash-screen";
interface SubHeadingProps {
  title: string | undefined | React.ReactNode;
  style: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: () => void;
}

SplashScreen.preventAutoHideAsync();

const StyledText: FC<SubHeadingProps> = ({
  title,
  style,
  onPress,
  ...rest
}) => {
  const [fontsLoaded] = useFonts({
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
      default:
        return "WorkSans";
    }
  };

  var newStyle = Object.assign({}, style, {
    fontFamily: getFontFamily(parseInt(style?.fontWeight)),
  });

  return (
    <Text
      style={newStyle}
      {...rest}
      onLayout={onLayoutRootView}
      onPress={onPress}
    >
      {title}
    </Text>
  );
};

export default StyledText;
