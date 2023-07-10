import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FALLBACK_IMAGE } from "../../components/Avatar";
import { useLocalSearchParams } from "expo-router";

const FullImage = ({ route }) => {
  const params = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <View style={styles.imageTitleBox}>
          <Text style={styles.imageTitle}>{params.title}</Text>
        </View>
        <Image
          source={{
            uri: params.uri || FALLBACK_IMAGE,
          }}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </View>
    </View>
  );
};

export default FullImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  imageBox: {
    height: 250,
    width: 250,
  },
  imageTitleBox: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 30,
    width: "100%",
    zIndex: 1,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  imageTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
