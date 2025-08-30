import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LightTheme, DarkTheme } from "../utils/themes";
import { supabase } from "../utils/supabase";

const AppContext = createContext();

const DEFAULT_SETTINGS = {
  preferredTheme: "system",
};

export const AppProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loadingSettings, setLoadingSettings] = useState(true);

  const systemScheme = useColorScheme();

  // Compute theme based on settings + system scheme
  const theme = useMemo(() => {
    if (settings.preferredTheme === "system") {
      return systemScheme === "dark" ? DarkTheme : LightTheme;
    }
    return settings.preferredTheme === "dark" ? DarkTheme : LightTheme;
  }, [settings, systemScheme]);

  // Load settings once on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("settings");
        if (stored) {
          setSettings(JSON.parse(stored));
        } else {
          await AsyncStorage.setItem(
            "settings",
            JSON.stringify(DEFAULT_SETTINGS)
          );
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoadingSettings(false);
      }
    })();
  }, []);

  // Save settings whenever they change (except on initial load)
  useEffect(() => {
    if (!loadingSettings) {
      AsyncStorage.setItem("settings", JSON.stringify(settings)).catch((err) =>
        console.error("Failed to save settings", err)
      );
    }
  }, [settings, loadingSettings]);

  // Supabase auth listener
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  // Optionally, don't render children until settings are loaded
  if (loadingSettings) return null;

  // Fetch user data when session changes
  if (session && !user) {
    fetchUserProfile()
      .then((data) => setUser(data))
      .catch(console.error);

    console.log("Session:", session);
  }

  async function fetchUserProfile() {
    const { data, error, status } = await supabase
      .from("profiles")
      .select(`username, bio, avatar_url, full_name`)
      .eq("id", session?.user.id)
      .single();
    if (error && status !== 406) {
      throw error;
    }

    console.log("user profile:", data);
    return data;
  }

  return (
    <AppContext.Provider
      value={{
        session,
        setSession,
        user,
        setUser,
        settings,
        setSettings,
        theme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
