import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { BottomNavigation } from "react-native-paper";
import ThemedText from "../components/ui/ThemedText";
import { FontAwesome } from "@expo/vector-icons";

import Feed from "../screens/home/Feed";
import Library from "../screens/home/Library";
import Profile from "../screens/home/Profile";
import ThemedBottomBar from "../components/ui/ThemedBottomBar";

export default function Home() {
  return <ThemedBottomBar />;
}
