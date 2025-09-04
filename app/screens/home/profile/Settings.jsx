import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useApp } from "../../../utils/AppContext";

export default function Settings() {
  const { theme } = useApp();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Go Back Button */}
      <IconButton
        icon={() => (
          <FontAwesome name="arrow-left" size={24} color={theme.colors.text} />
        )}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />
      <Text>Settings Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
  },
});
