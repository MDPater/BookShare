import React, { useState } from "react";
import { Button, TextInput, Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Alert, StyleSheet, View, ScrollView } from "react-native";
import { supabase } from "../../utils/supabase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "bookshare://",
      },
    });

    if (error) Alert.alert(error.message);
    if (!error && !session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  };

  return (
    <View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          label="Email"
          mode="outlined"
          theme={{ roundness: 25 }}
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
          mode="outlined"
          theme={{ roundness: 25 }}
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
      <View style={styles.verticallySpaced}>
        <Button
          mode="contained"
          loading={loading}
          disabled={loading}
          onPress={() => signUpWithEmail()}
        >
          Sign up
        </Button>
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
