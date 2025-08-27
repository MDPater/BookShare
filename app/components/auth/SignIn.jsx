import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  TextInput,
  Dialog,
  Portal,
  useTheme,
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";
import ThemedText from "../ui/ThemedText";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const theme = useTheme();

  const [visible, setVisible] = useState(false); // State for Dialog visibility
  const [errorMsg, setErrorMsg] = useState("");
  const hideDialog = () => setVisible(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg(error.message);
      setVisible(true);
    }
    setLoading(false);
  }

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
          onPress={() => signInWithEmail()}
        >
          Sign in
        </Button>
      </View>
      {/* Alert Box on Error*/}
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{ backgroundColor: theme.colors.dialog }} // ✅ uses our custom color
        >
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <ThemedText>{errorMsg}</ThemedText>
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
