import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ThemedText from "../../../components/ui/ThemedText";

import { useApp } from "../../../utils/AppContext";

export default function Settings() {
  const { theme, settings, setSettings } = useApp();
  const navigation = useNavigation();

  // Function to handle theme selection
  const handleThemeChange = (newTheme) => {
    setSettings((prev) => ({
      ...prev,
      preferredTheme: newTheme,
    }));
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Go Back Button */}
      <IconButton
        icon={() => (
          <FontAwesome name="arrow-left" size={24} color={theme.colors.text} />
        )}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />

      <View style={styles.content}>
        <ThemedText style={styles.heading}>Theme</ThemedText>
        <View style={styles.themeOptions}>
          {["system", "light", "dark"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.themeButton,
                {
                  borderColor: theme.colors.onBackground,
                  backgroundColor:
                    settings.preferredTheme === option
                      ? theme.colors.primary
                      : "transparent",
                },
              ]}
              onPress={() => handleThemeChange(option)}
            >
              <ThemedText
                style={[
                  styles.themeButtonText,
                  {
                    color:
                      settings.preferredTheme === option
                        ? "white"
                        : theme.colors.text,
                  },
                ]}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 60,
  },
  content: {
    width: "80%",
  },
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  themeOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  themeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
