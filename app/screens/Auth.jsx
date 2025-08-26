import React, { useState } from "react";
import { Text, Divider } from "react-native-paper";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import GoogleSSO from "../components/auth/GoogleSSO";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

export default function Auth() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "signIn", title: "Sign In" },
    { key: "signUp", title: "Sign Up" },
  ]);

  // Map each tab to a component
  const renderScene = SceneMap({
    signIn: SignIn,
    signUp: SignUp,
  });

  return (
    <View style={styles.container}>
      {/* Sign-in form */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Welcome to BookShare</Text>
        <Text style={styles.headerSubtitle}>
          Sort your books, track your reading, and see your progress all in one
          place.
        </Text>
      </View>

      {/* TabView slider */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#6200ee" }}
            style={{ backgroundColor: "white" }}
            renderLabel={({ route, focused }) => (
              <Text
                style={{
                  color: focused ? "#6200ee" : "#888",
                  fontWeight: "bold",
                }}
              >
                {route.title}
              </Text>
            )}
          />
        )}
      />

      {/* Divider */}
      <View style={[styles.orContainer, styles.mt20]}>
        <Divider style={{ flex: 1, height: 1 }} />
        <Text style={styles.orText}>OR</Text>
        <Divider style={{ flex: 1, height: 1 }} />
      </View>

      {/* Google login */}
      <View
        style={[
          styles.verticallySpaced && styles.mt40,
          { alignSelf: "center" },
        ]}
      >
        <GoogleSSO />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  mt40: {
    marginTop: 30,
  },
  headerContainer: {
    marginTop: 30,
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
