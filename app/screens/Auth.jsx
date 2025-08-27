import React, { useState } from "react";
import { Text, Divider, TouchableRipple, useTheme } from "react-native-paper";
import {
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { TabView } from "react-native-tab-view";

import GoogleSSO from "../components/auth/GoogleSSO";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

export default function Auth() {
  const layout = useWindowDimensions();
  const theme = useTheme();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "signIn", title: "Sign In" },
    { key: "signUp", title: "Sign Up" },
  ]);

  const [tabHeights, setTabHeights] = useState({}); // store height of each scene

  const renderScene = ({ route }) => {
    const SceneComponent = route.key === "signIn" ? SignIn : SignUp;
    return (
      <View
        onLayout={(event) => {
          const height = event.nativeEvent.layout.height;
          setTabHeights((prev) => ({ ...prev, [route.key]: height }));
        }}
      >
        <SceneComponent />
      </View>
    );
  };

  const currentHeight = tabHeights[routes[index].key] || 200; // fallback height

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Welcome to BookShare</Text>
        <Text style={styles.headerSubtitle}>
          Sort your books, track your reading, and see your progress all in one
          place.
        </Text>
      </View>

      {/* TabView */}
      <View style={[styles.tabContainer, { height: currentHeight + 48 }]}>
        {/* +48 for TabBar height */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <View
              style={{
                flexDirection: "row",
                borderRadius: 25,
                overflow: "hidden",
                backgroundColor: theme.colors.surface, // dynamic background
                elevation: 2, // optional shadow
              }}
            >
              {props.navigationState.routes.map((route, i) => {
                const focused = index === i;
                return (
                  <TouchableRipple
                    key={route.key}
                    onPress={() => setIndex(i)}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      backgroundColor: focused
                        ? theme.colors.primary
                        : "transparent",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: focused
                          ? theme.colors.onPrimary // text color on primary
                          : theme.colors.primary, // primary color for unfocused
                        fontWeight: "bold",
                      }}
                    >
                      {route.title}
                    </Text>
                  </TouchableRipple>
                );
              })}
            </View>
          )}
        />
      </View>

      {/* Divider */}
      <View style={[styles.orContainer, styles.mt20]}>
        <Divider style={{ flex: 1, height: 1 }} />
        <Text style={styles.orText}>OR</Text>
        <Divider style={{ flex: 1, height: 1 }} />
      </View>

      {/* Google login */}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <GoogleSSO />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 12,
    paddingBottom: 40,
  },
  tabContainer: {
    alignSelf: "stretch",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  headerContainer: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  orText: {
    marginHorizontal: 8,
    color: "#666",
    fontWeight: "bold",
  },
});
