import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CallCard from "../../components/Calls/SingleCall";
import { black } from "../../constants/Colors";

const Search = () => {
  return (
    <View style={styles.container}>
      <CallCard src={""} callerName={"Paris"} callType={"AUDIO"} timestamp={""}      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black[700],
  },
});
