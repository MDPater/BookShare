import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./app/utils/supabase";
import { View } from "react-native";

import Home from "./app/screens/Home";
import Auth from "./app/screens/Auth";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? <Home session={session} /> : <Auth />}
    </View>
  );
}
