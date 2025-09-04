import "react-native-url-polyfill/auto";
import 'react-native-gesture-handler';
import { View, StatusBar } from "react-native";
import { Provider as PaperProvider, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';

import { AppProvider, useApp } from "./app/utils/AppContext";

import HomeNavigator from "./app/navigation/HomeNavigator"
import Auth from "./app/screens/Auth";

function Main() {
  const { session, theme } = useApp();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <PaperProvider theme={theme}>
        <Portal.Host>
          <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
            {session && session.user ? 
            <NavigationContainer theme={theme}>
              <HomeNavigator/>
            </NavigationContainer> : <Auth />}
          </View>
        </Portal.Host>
      </PaperProvider>
    </SafeAreaView>
  );
}

// This is the root component that provides the context
export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}