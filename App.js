import "react-native-url-polyfill/auto";
import { AppProvider, useApp } from "./app/utils/AppContext";
import { View } from "react-native";
import { Provider as PaperProvider, Portal } from "react-native-paper";

import Home from "./app/screens/Home";
import Auth from "./app/screens/Auth";
import { SafeAreaView } from "react-native-safe-area-context";

function Main() {
  const { session, theme } = useApp();

  return (
    <PaperProvider theme={theme}>
      <Portal.Host>
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          {session && session.user ? <Home /> : <Auth />}
        </View>
      </Portal.Host>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Main />
      </SafeAreaView>
    </AppProvider>
  );
}
