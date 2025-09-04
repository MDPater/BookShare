import React from "react";
import { View, StyleSheet } from "react-native";
import ThemedText from "../../components/ui/ThemedText";

export default function Library() {
  return (
    <View style={styles.rootContainer}>
      <ThemedText style={styles.header}>Library</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
