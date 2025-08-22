import React from "react";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { supabase } from "../../utils/supabase";
import { Button } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";

export default function GoogleSSO() {
  GoogleSignin.configure({
    scopes: ["profile", "email"],
    offlineAccess: true,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });
        console.log("Supabase:", { data, error });
      } else {
        throw new Error("No ID token present!");
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled login");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Google Play Services not available");
      } else {
        console.error("Google sign-in error:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={handleGoogleSignIn}
        icon={() => (
          <Image
            source={{ uri: "https://img.icons8.com/color/48/google-logo.png" }}
            style={styles.icon}
          />
        )}
        style={styles.button}
        labelStyle={styles.label}
      >
        Continue with Google
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    elevation: 2, // subtle shadow
  },
  label: {
    color: "#000",
    fontWeight: "600",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
