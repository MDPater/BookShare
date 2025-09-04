import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import all the screens you want in this stack
import Home from "../screens/Home";
import Feed from "../screens/home/Feed";
import Library from "../screens/home/Library";
import Profile from "../screens/home/Profile";
import EditProfile from "../screens/home/profile/EditProfile";
import Settings from "../screens/home/profile/Settings";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
