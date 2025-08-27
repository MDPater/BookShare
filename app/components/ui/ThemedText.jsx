import { Text, useTheme } from "react-native-paper";

export default function ThemedText({ style, ...props }) {
  const theme = useTheme();
  return <Text style={[{ color: theme.colors.text }, style]} {...props} />;
}
