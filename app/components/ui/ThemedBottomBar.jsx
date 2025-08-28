import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useApp } from "../../utils/AppContext";
import ThemedText from "./ThemedText";

import Feed from "../../screens/home/Feed";
import Library from "../../screens/home/Library";
import Profile from "../../screens/home/Profile";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BAR_MARGIN_HORIZONTAL = 20;
const BAR_PADDING_HORIZONTAL = 5;

export default function Home() {
  const { theme } = useApp();
  const [index, setIndex] = useState(0);

  const routes = [
    { key: "feed", title: "Home", icon: "home", component: Feed },
    { key: "library", title: "Library", icon: "book", component: Library },
    { key: "profile", title: "Profile", icon: "user", component: Profile },
  ];

  const CurrentScreen = routes[index].component;
  const animatedValue = useState(new Animated.Value(0))[0];

  const BAR_WIDTH = SCREEN_WIDTH - BAR_MARGIN_HORIZONTAL * 2;
  const TAB_WIDTH = (BAR_WIDTH - BAR_PADDING_HORIZONTAL * 2) / routes.length;
  const PILL_MARGIN = 5;

  useEffect(() => {
    // Calculate the horizontal offset for the pill's animated position
    const offset = BAR_PADDING_HORIZONTAL + PILL_MARGIN / 2;
    const toValue = TAB_WIDTH * index + offset;

    Animated.spring(animatedValue, {
      toValue,
      useNativeDriver: true,
      bounciness: 5,
    }).start();
  }, [index, TAB_WIDTH]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.screenContainer}>
        <CurrentScreen />
      </View>

      <View
        style={[
          styles.floatingBarContainer,
          {
            backgroundColor: theme.colors.surface,
            shadowColor: theme.dark ? "#000" : "#aaa",
          },
        ]}
      >
        {/* Active pill */}
        <Animated.View
          style={[
            styles.activePill,
            {
              transform: [{ translateX: animatedValue }],
              width: TAB_WIDTH - PILL_MARGIN,
              backgroundColor: theme.colors.primary,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name={routes[index].icon}
              size={20}
              color="white"
              style={{ marginRight: 6 }}
            />
            <ThemedText style={{ fontWeight: "bold", color: "white" }}>
              {routes[index].title}
            </ThemedText>
          </View>
        </Animated.View>

        {/* Tabs */}
        {routes.map((route, i) => {
          const isActive = index === i;
          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tab, { width: TAB_WIDTH }]}
              onPress={() => setIndex(i)}
            >
              {!isActive && (
                <FontAwesome
                  name={route.icon}
                  size={20}
                  color={theme.colors.onSurface}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  floatingBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    left: BAR_MARGIN_HORIZONTAL,
    right: BAR_MARGIN_HORIZONTAL,
    bottom: 20,
    height: 60,
    borderRadius: 30,
    elevation: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    paddingHorizontal: BAR_PADDING_HORIZONTAL,
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  activePill: {
    position: "absolute",
    height: "75%",
    borderRadius: 25,
    top: "12.5%",
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    overflow: "hidden",
  },
});
