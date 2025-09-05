import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, View } from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";

import { supabase } from "../../utils/supabase";
import { useApp } from "../../utils/AppContext";
import ThemedText from "../ui/ThemedText";

export default function EditAvatar({ url, size }) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const { user, theme } = useApp();

  useEffect(() => {
    if (url) {
      if (url.includes("googleusercontent.com")) {
        setAvatarUrl(url);
      } else {
        downloadImage(url);
      }
    }
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result);
      };
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  async function selectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
        exif: false,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableRipple onPress={selectImage}>
        {avatarUrl ? (
          <Avatar.Image size={size} source={{ uri: user.avatar_url }} />
        ) : (
          <Avatar.Text
            size={size}
            label={user.username ? user.username.charAt(0).toUpperCase() : ""}
          />
        )}
      </TouchableRipple>
      <TouchableRipple onPress={selectImage}>
        <ThemedText
          style={[styles.changeText, { color: theme.colors.primary }]}
        >
          Change profile picture
        </ThemedText>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  changeText: { marginTop: 10, fontWeight: "bold" },
});
