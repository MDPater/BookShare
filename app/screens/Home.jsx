import {View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({session}) {
    return(
        <SafeAreaView>
            <Text>{session.user.id}</Text>
        </SafeAreaView>
    )
}