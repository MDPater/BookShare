import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./app/utils/supabase";
import { View, useColorScheme } from "react-native";
import {
  Provider as PaperProvider,
  Portal,
  useTheme,
} from "react-native-paper";

import Home from "./app/screens/Home";
import Auth from "./app/screens/Auth";

import { LightTheme, DarkTheme } from "./app/utils/themes";

export default function App() {
  const [session, setSession] = useState(null);

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <PaperProvider theme={theme}>
      <Portal.Host>
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          {session && session.user ? <Home session={session} /> : <Auth />}
        </View>
      </Portal.Host>
    </PaperProvider>
  );
}
