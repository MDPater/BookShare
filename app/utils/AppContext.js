import { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LightTheme, DarkTheme } from "../utils/themes";
import { supabase } from "../utils/supabase";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [settings, setSettings] = useState({});
  const systemScheme = useColorScheme();

  const theme = (() => {
    if (!settings) return LightTheme;
    if (settings.preferredTheme === "system") {
      return systemScheme === "dark" ? DarkTheme : LightTheme;
    }
    return settings.preferredTheme === "dark" ? DarkTheme : LightTheme;
  })();

  // Load settings from AsyncStorage on app start
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem("settings");
        if (stored) {
          setSettings(JSON.parse(stored));
        } else {
          const defaults = { preferredTheme: "system" };
          setSettings(defaults);
          await AsyncStorage.setItem("settings", JSON.stringify(defaults));
        }
      } catch (error) {
        console.error("Failed to load settings", error);
      }
    };

    loadSettings();
  }, []);

  // Save settings whenever they change
  useEffect(() => {
    if (settings) {
      AsyncStorage.setItem("settings", JSON.stringify(settings)).catch((err) =>
        console.error("Failed to save settings", err)
      );
    }
  }, [settings]);

  //supabase auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ session, setSession, settings, setSettings, theme }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
