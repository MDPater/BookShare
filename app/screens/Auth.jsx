import { Divider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import GoogleSSO from "../components/auth/GoogleSSO";
import SignIn from "../components/auth/SignIn";

export default function Auth() {
  return (
    <View style={styles.container}>
      <SignIn />

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Divider />
      </View>
      <View style={[styles.verticallySpaced, { alignSelf: "center" }]}>
        <GoogleSSO />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
