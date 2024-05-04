import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


export default function App() {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View className="flex-1 items-center justify-center bg-white">
          <Text>bitesy</Text>
          <StatusBar style="auto" />
          <Link href="/camera" className="text-blue-500">
            Share your bites
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
