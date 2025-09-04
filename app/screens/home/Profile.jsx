import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Avatar, Divider, IconButton } from "react-native-paper";
import ThemedText from "../../components/ui/ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from "../../utils/supabase";
import { useApp } from "../../utils/AppContext";

export default function Profile() {
  const { session, user, setUser, theme } = useApp();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function signOut() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      setUser(null);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.rootContainer}>
      {/* Settings Button */}
      <IconButton
        icon={() => (
          <FontAwesome name="cog" size={24} color={theme.colors.text} />
        )}
        onPress={() => navigation.navigate("Settings")}
        style={styles.settingsButton}
      />

      {/* Profile Header */}
      <View style={styles.header}>
        {user.avatar_url ? (
          <Avatar.Image
            size={80}
            source={{ uri: user.avatar_url }}
            style={styles.avatar}
          />
        ) : (
          <Avatar.Text
            size={80}
            label={user.username ? user.username.charAt(0).toUpperCase() : ""}
            style={styles.avatar}
          />
        )}
        <View style={styles.userInfo}>
          <ThemedText style={styles.usernameText}>{user.username}</ThemedText>
          {user.full_name ? (
            <ThemedText style={styles.fullNameText}>
              {user.full_name}
            </ThemedText>
          ) : null}
        </View>
      </View>

      {/* Bio */}
      {user.bio ? (
        <ThemedText style={styles.bioText}>{user.bio}</ThemedText>
      ) : null}

      {/* Follower/Following/Posts stats */}
      <View style={styles.statsContainer}>
        {/* Placeholder for stats */}
        <ThemedText style={styles.statsText}>
          <ThemedText style={styles.statsCount}>120</ThemedText> Books read
        </ThemedText>
        <ThemedText style={styles.statsText}>
          <ThemedText style={styles.statsCount}>500</ThemedText> Books in
          Library
        </ThemedText>
        <ThemedText style={styles.statsText}>
          <ThemedText style={styles.statsCount}>420</ThemedText> BookWorms
        </ThemedText>
      </View>

      {/* Edit Profile and Sign Out Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.button}
        >
          Edit Profile
        </Button>
        <Button
          mode="contained"
          loading={loading}
          disabled={loading}
          onPress={() => signOut()}
          style={styles.button}
          buttonColor={theme.colors.error}
        >
          Sign out
        </Button>
      </View>

      <Divider style={styles.mt20}></Divider>

      {/* User ID */}
      <View style={styles.container}>
        <ThemedText>User ID:</ThemedText>
        <ThemedText>{session.user.id}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
    position: "relative",
  },
  settingsButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    marginRight: 20,
  },
  userInfo: {
    justifyContent: "center",
  },
  usernameText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  fullNameText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 5,
  },
  bioText: {
    fontSize: 14,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statsText: {
    fontSize: 14,
    color: "#555",
  },
  statsCount: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  container: {
    marginTop: 40,
    padding: 12,
  },
  mt20: {
    marginTop: 20,
  },
});
