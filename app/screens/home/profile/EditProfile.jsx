import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import {
  IconButton,
  TextInput,
  Button,
  Dialog,
  Portal,
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ThemedText from "../../../components/ui/ThemedText";

import { useApp } from "../../../utils/AppContext";
import { supabase } from "../../../utils/supabase";
import EditAvatar from "../../../components/profile/EditAvatar";

export default function EditProfile() {
  const { session, theme, user, setUser } = useApp();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [visible, setVisible] = useState(false);
  const [dialogTtl, setDialogTtl] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const hideDialog = () => setVisible(false);

  function fetchProfile() {
    try {
      setLoading(true);
      if (user) {
        setFullName(user.full_name);
        setUsername(user.username);
        setBio(user.bio);
        setAvatarUrl(user.avatar_url);
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const updates = {
        id: session.user.id,
        full_name: fullName,
        username,
        bio,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };
      const { data, error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }

      setUser((prev) => ({
        ...prev,
        full_name: fullName,
        username,
        bio,
        avatar_url: avatarUrl,
      }));

      console.log("update: ", data);
      setDialogTtl("Success");
      setDialogMsg("Profile updated successfully!");
      setVisible(true);
    } catch (error) {
      setDialogTtl("Error");
      setDialogMsg(error.message);
      setVisible(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [session, user]);

  return (
    <View style={[styles.container]}>
      {/* Go Back Button */}
      <IconButton
        icon={() => (
          <FontAwesome name="arrow-left" size={24} color={theme.colors.text} />
        )}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.centeredContent}
        >
          <View style={styles.formContainer}>
            <View style={[styles.input, styles.avatarContainer]}>
              <EditAvatar
                size={200}
                url={avatarUrl}
                onUpload={(url) => {
                  setAvatarUrl(url);
                  updateProfile;
                  console.log(user);
                }}
              />
            </View>

            {/* Email Field */}
            <View style={styles.input}>
              <ThemedText style={styles.inputText}>Email:</ThemedText>
              <TextInput
                mode="outlined"
                value={session?.user?.email}
                disabled
                style={{ backgroundColor: theme.colors.surface }}
                textColor={theme.colors.placeholder}
                theme={{
                  roundness: 15,
                }}
              />
            </View>

            {/* Full Name Field */}
            <View style={styles.input}>
              <ThemedText style={styles.inputText}>Name:</ThemedText>
              <TextInput
                mode="outlined"
                value={fullName || ""}
                onChangeText={(text) => setFullName(text)}
                style={{ backgroundColor: theme.colors.surface }}
                theme={{
                  roundness: 15,
                  colors: {
                    primary: theme.colors.primary,
                    text: theme.colors.onSurface,
                  },
                }}
              />
            </View>

            {/* Username Field */}
            <View style={styles.input}>
              <ThemedText style={styles.inputText}>Username:</ThemedText>
              <TextInput
                mode="outlined"
                value={username || ""}
                onChangeText={(text) => setUsername(text)}
                style={{ backgroundColor: theme.colors.surface }}
                theme={{
                  roundness: 15,
                  colors: {
                    primary: theme.colors.primary,
                    text: theme.colors.onSurface,
                  },
                }}
              />
            </View>

            {/* Bio Field */}
            <View style={styles.input}>
              <ThemedText style={styles.inputText}>Bio:</ThemedText>
              <TextInput
                value={bio || ""}
                onChangeText={(text) => setBio(text)}
                multiline
                style={{
                  backgroundColor: theme.colors.surface,
                  maxHeight: 100,
                  textAlignVertical: "top",
                }}
                theme={{
                  roundness: 15,
                  colors: {
                    primary: theme.colors.primary,
                    text: theme.colors.onSurface,
                  },
                }}
              />
            </View>

            {/* Update Button */}
            <Button
              mode="contained"
              onPress={updateProfile}
              loading={loading}
              disabled={loading}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              labelStyle={{ color: "white" }}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </View>

          {/* Alert Box on Error*/}
          <Portal>
            <Dialog
              visible={visible}
              onDismiss={hideDialog}
              style={{ backgroundColor: theme.colors.dialog }} // ✅ uses our custom color
            >
              <Dialog.Title>{dialogTtl}</Dialog.Title>
              <Dialog.Content>
                <ThemedText>{dialogMsg}</ThemedText>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  centeredContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
  },
  avatarContainer: {
    alignItems: "center",
  },
  inputText: {
    paddingLeft: 15,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    paddingVertical: 8,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 16,
    zIndex: 1,
  },
});
