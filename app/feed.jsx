import { Text, View, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useEffect, useState } from "react";

const feed = () => {
  const [posts, getPosts] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        "http://3.212.225.84:8000/api/get-experiences/"
      );
      getPosts(data.experiences);
    }
    getData();
  }, []);

  return (
    <SafeAreaView className="h-full bg-black relative">
      <StatusBar style="auto" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View className="flex h-[75vh] relative mb-[30px]">
              <Image
                source={{
                  uri: item.image1,
                }}
                className="h-[85%] z-[5]"
              />
              <Image
                source={{
                  uri: item.image2,
                }}
                className="absolute rounded-3xl overflow-hidden top-3 left-3 w-[110px] h-[150px] z-10"
              />
              <View className="flex p-[20px] gap-1 rounded-md border-2 border-white w-[95%] h-[95px] mx-auto justify-center items-start my-[10px]">
                <Text className="text-white text-xl font-bold">
                  {item.title}
                </Text>
                <Text className="text-white text-lg"s>
                  Calories: {item.calories}
                </Text>
              </View>
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <View className="flex-row justify-center items-center py-5">
            <Image
              source={require("../assets/icons/Logo.png")}
              className="w-[155px] h-[60px]"
            />
          </View>
        )}
      />
      <Link className="absolute bottom-[10%] left-[32%]" href="/">
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0.5)",
            "rgba(255, 255, 255, 0)",
            "rgba(255, 72, 219, 0)",
            "rgba(255, 72, 219, 0.5)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="rounded-[30px] h-[50px] w-[150px]"
        >
          <View className="flex-1 rounded-[25px] m-[4px] bg-black relative">
            <Text className="m-[10px] text-white text-lg absolute left-[5%] top-[-3]">
              Retake bitsey
            </Text>
          </View>
        </LinearGradient>
      </Link>
    </SafeAreaView>
  );
};

export default feed;
