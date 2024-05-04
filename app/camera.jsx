import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";

const camera = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo);
      } catch (error) {
        console.log(error)
      }
    }
  };

  if (!permission) {
    return <View></View>;
  }

  if (!permission?.granted) {
    return (
      <SafeAreaView className="bg-[#1E1E1E] h-full">
        <View className="flex justify-center items-center h-full">
          <Text>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (photoUri){
    return <Image source={{ uri: photoUri.uri}} className="w-[300px] h-[500px]"/>;
  }

  return (
    <SafeAreaView className="bg-[#1E1E1E] w-full h-screen">
      <StatusBar style="auto" />
      <View className="h-[15%] flex-row justify-center items-center relative">
        <Image
          source={require("../assets/icons/bitesy.png")}
          className="absolute bottom-7 w-[155px]"
        />
      </View>
      <View className="w-full flex justify-center h-[70%]">
        <Camera type={type} className="h-full w-full" ref={cameraRef} />
      </View>
      <View className="h-[15%] relative w-full">
        <View className="absolute left-[20%] top-10">
          <TouchableOpacity className="w-[200px] h-[50px] text-white">
            <Image source={require("../assets/icons/flash-off.png")} />
          </TouchableOpacity>
        </View>
        <View className="absolute left-[41%] top-6">
          <TouchableOpacity
            className="w-[200px] h-[50px] text-white rounded-[100%]"
            onPress={takePicture}
          >
            <Image source={require("../assets/icons/camera.png")} />
          </TouchableOpacity>
        </View>
        <View className="absolute right-[-80] top-10">
          <TouchableOpacity
            onPress={toggleCameraType}
            className="w-[200px] h-[50px] text-white"
          >
            <Image source={require("../assets/icons/flip.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default camera;
