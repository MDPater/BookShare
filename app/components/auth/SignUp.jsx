import React, { useState } from "react";
import { Button, TextInput, Dialog, Portal, Text } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../../utils/supabase";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [visible, setVisible] = useState(false); // State for Dialog visibility
  const [errorTtl, setErrorTtl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const hideDialog = () => setVisible(false);

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
        data: {
          username: username,
        },
      },
    });

    if (error) {
      setErrorTtl("Error");
      setErrorMsg(error.message);
      setVisible(true);
    }
    if (!error && !session) {
      setErrorTtl("Success");
      setErrorMsg("Please check your inbox for email verification!");
      setVisible(true);
    }
    setLoading(false);
  };

  return (
    <View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          label="Username"
          mode="outlined"
          theme={{ roundness: 25 }}
          left={
            <TextInput.Icon
              icon={() => <FontAwesome name="user" size={20} />}
            />
          }
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="your.username"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced]}>
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
          right={
            <TextInput.Icon
              icon={() => (
                <FontAwesome
                  name={passwordVisible ? "eye" : "eye-slash"}
                  size={20}
                />
              )}
              onPress={() => setPasswordVisible(!passwordVisible)} // Toggle visibility on press
            />
          }
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!passwordVisible}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          mode="contained"
          loading={loading}
          disabled={loading}
          onPress={() => signUpWithEmail()}
        >
          Sign up
        </Button>
      </View>
      {/* Alert Box on Error*/}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{errorTtl}</Dialog.Title>
          <Dialog.Content>
            <Text>{errorMsg}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
