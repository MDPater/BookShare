// themes.js
import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";

export const LightTheme = {
  ...PaperDefaultTheme,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
    background: "#ffffff",
    surface: "#ffffff",
    surfaceVariant: "#f2f2f7",
    dialog: "#ffffff",
    text: "#000000",
    onSurface: "#1c1c1c",
    placeholder: "#6b6b6b",
    disabled: "#c7c7c7",
    outline: "#d1d1d6",
    error: "#B00020",
    notification: "#f50057",
    backdrop: "rgba(0,0,0,0.4)",
  },
};

export const DarkTheme = {
  ...PaperDefaultTheme,
  dark: true,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: "#bb86fc",
    primaryVariant: "#d0a8ff",
    accent: "#03dac6",
    background: "#121212",
    surface: "#1e1e1e",
    surfaceVariant: "#2a2a2a",
    dialog: "#181818",
    text: "#ffffff",
    onSurface: "#f5f5f5",
    placeholder: "#a1a1a1",
    disabled: "#5a5a5a",
    outline: "#3f3f46",
    error: "#cf6679",
    notification: "#ff80ab",
    backdrop: "rgba(0,0,0,0.65)",
  },
};
