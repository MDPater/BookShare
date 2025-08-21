import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../utils/supabase";

export default function Home({ session }) {
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
  }

  return (
    <View style={styles.container}>
      <Text>{session.user.id}</Text>
      <Button
        mode="contained" // Use 'contained' for a filled button
        loading={loading} // `loading` prop directly corresponds to your `loading` state
        disabled={loading} // The `disabled` prop works the same way
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
