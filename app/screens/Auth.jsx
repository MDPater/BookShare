import React, { useState } from "react";
import { Button, TextInput, Divider } from "react-native-paper";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { FontAwesome } from "@expo/vector-icons";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../utils/supabase";
import GoogleSSO from "../components/auth/GoogleSSO";

const [loading, setLoading] = useState(false);

WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);
  if (errorCode) throw new Error(errorCode);

  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const signUpWithEmail = async () => {
  setLoading(true);
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) Alert.alert(error.message);
  if (!session) Alert.alert("Please check your inbox for email verification!");
  setLoading(false);
};

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
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
      <View style={[styles.verticallySpaced, { alignSelf: "center" }]}>
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
