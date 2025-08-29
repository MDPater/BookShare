import React from "react";
import { View, StyleSheet } from "react-native";
import ThemedBottomBar from "../components/ui/ThemedBottomBar";

export default function Home() {
  return (
    <View style={styles.container}>
      <ThemedBottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
