import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, View } from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";

import { supabase } from "../../utils/supabase";
import { useApp } from "../../utils/AppContext";
import ThemedText from "../ui/ThemedText";

export default function EditAvatar({ url, size, onUpload }) {
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
        aspect: [1, 1],
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];

      if (!image.uri) {
        throw new Error("No image uri!"); // Realistically, this should never happen, but just in case...
      }
      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(data.path);
      setAvatarUrl(data.path);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableRipple onPress={selectImage}>
        {avatarUrl ? (
          <Avatar.Image size={size} source={{ uri: avatarUrl }} />
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
