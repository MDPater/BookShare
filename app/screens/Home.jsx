import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { BottomNavigation } from "react-native-paper";
import ThemedText from "../components/ui/ThemedText";
import { FontAwesome } from "@expo/vector-icons";

import Feed from "../screens/home/Feed";
import Library from "../screens/home/Library";
import Profile from "../screens/home/Profile";

export default function Home() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "feed", title: "Feed", icon: "home" },
    { key: "library", title: "Library", icon: "book" },
    { key: "profile", title: "Profile", icon: "user" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: Feed,
    library: Library,
    profile: Profile,
  });

  return (
    <View style={{ flex: 1 }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={({ route, color }) => (
          <FontAwesome name={route.icon} size={20} color={color} />
        )}
        safeAreaInsets={{ bottom: 0 }}
        barStyle={{ backgroundColor: "transparent", elevation: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    borderRadius: 20,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: "hidden", // clip children to rounded corners
  },
});
