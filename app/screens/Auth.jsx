import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../utils/supabase";
import GoogleSSO from "../components/auth/GoogleSSO";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          label="Email"
          left={
            <TextInput.Icon
              icon={() => <FontAwesome name="envelope" size={20} />}
            />
          }
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          label="Password"
          left={
            <TextInput.Icon
              icon={() => <FontAwesome name="lock" size={20} />}
            />
          }
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          mode="contained" // Use 'contained' for a filled button
          loading={loading} // `loading` prop directly corresponds to your `loading` state
          disabled={loading} // The `disabled` prop works the same way
          onPress={() => signInWithEmail()}
        >
          Sign in
        </Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          mode="contained" // Use 'contained' for a filled button
          loading={loading} // `loading` prop directly corresponds to your `loading` state
          disabled={loading} // The `disabled` prop works the same way
          onPress={() => signUpWithEmail()}
        >
          Sign up
        </Button>
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Divider />
      </View>
      <View style={styles.verticallySpaced}>
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
});
