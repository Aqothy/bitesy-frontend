import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const feed = () => {
  posts = [
    { id: 1, img: "../assets/icons/kc.png", user: "barry", caption: "hi", cal: "550" },
  ];
  return (
    <SafeAreaView className="bg-black">
      <StatusBar style="auto" />
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id}
        renderItem={({ post }) => (
          <View>
            <Text>Hi</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <Text>hi</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default feed;
