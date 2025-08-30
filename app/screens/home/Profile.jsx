import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import ThemedText from "../../components/ui/ThemedText";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from "../../utils/supabase";
import { useApp } from "../../utils/AppContext";

export default function Profile() {
  const { session, user, setUser } = useApp();
  const [loading, setLoading] = useState(false);

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
      <ThemedText style={styles.usernameText}>{user.username}</ThemedText>

      {/*Logout  */}
      <View style={styles.container}>
        <ThemedText>{session.user.id}</ThemedText>
        <Button
          mode="contained"
          loading={loading}
          disabled={loading}
          onPress={() => signOut()}
        >
          Sign out
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
  },
  container: {
    marginTop: 40,
    padding: 12,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
