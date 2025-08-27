import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { supabase } from "../utils/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { useApp } from "../utils/AppContext";

export default function Home() {
  const { session } = useApp();

  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>{session.user.id}</Text>
      <Button
        mode="contained"
        loading={loading}
        disabled={loading}
        onPress={() => signOut()}
      >
        Sign out
      </Button>
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
});
