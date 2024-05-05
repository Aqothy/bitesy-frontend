import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import flashOffImage from "../assets/icons/flash-off.png";
import flashOnImage from "../assets/icons/flash.png";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import axios from 'axios'


const App = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [fphotoUri, setfPhotoUri] = useState(null);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [second, setSecond] = useState(false);
  const [sphotoUri, setSPhotoUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const captionInputRef = useRef(null);


  // Function to focus the caption input field
  const focusCaptionInput = () => {
    if (captionInputRef.current) {
      captionInputRef.current.focus();
    }
  };

  const toggleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setLoading(true);
        let photo = await cameraRef.current.takePictureAsync();
        if (type === CameraType.front) {
          photo = await manipulateAsync(
            photo.localUri || photo.uri,
            [{ rotate: 180 }, { flip: FlipType.Vertical }],
            { compress: 1, format: SaveFormat.PNG }
          );
        }
        await downloadImage(photo.uri)
        second ? setSPhotoUri(photo) : setfPhotoUri(photo);

        setSecond(!second);
        setLoading(false);
        focusCaptionInput();
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  const handlePress = async () => {
    await takePicture();
    toggleCameraType();
  };

  function retake() {
    setfPhotoUri(null);
    setSPhotoUri(null);
    setType(CameraType.back);
  }

  async function sendFile(){
    const formData = new FormData();
    formData.append("image1", {
      uri: fphotoUri,
      type: "image/jpeg",
      name: "image.jpg",
    });
    formData.append("image2", {
      uri: sphotoUri,
      type: "image/jpeg",
      name: "image.jpg",
    });

    res = await axios.post()
  }

  return (
    <SafeAreaView className="bg-black w-full h-screen">
      <StatusBar style="auto" />
      <View className="h-[15%] flex-row justify-center items-center relative">
        <Image
          source={require("../assets/icons/Logo.png")}
          className="absolute bottom-3 w-[155px] h-[60px]"
        />
      </View>
      <View className={`w-full flex justify-center h-[70%]`}>
        {sphotoUri ? (
          <View className="relative w-full h-full">
            <Image
              source={{ uri: sphotoUri.uri }}
              className="absolute rounded-3xl overflow-hidden top-3 left-3 w-[110px] h-[150px] z-10"
            />
            <Image
              source={{ uri: fphotoUri.uri }}
              className="w-full h-full"
              blurRadius={15}
            />
            <TextInput
              ref={captionInputRef}
              placeholder="Enter caption..."
              placeholderTextColor="#000000"
              style={[
                {
                  position: "absolute",
                  borderColor: "black",
                  borderWidth: 2,
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  width: 145,
                  top: "47%",
                  left: "33%",
                  fontSize: 16,
                  color: "black",
                  backgroundColor: "#E5E4E2",
                  borderRadius: 3,
                },
              ]}
            />
          </View>
        ) : (
          <View className="w-full h-full relative">
            <Camera
              type={type}
              className={`h-full w-full`}
              ref={cameraRef}
              flashMode={flashMode}
              autoFocus
            />
            <BlurView
              intensity={loading ? 50 : 0}
              tint="dark"
              className="w-full h-full z-10 absolute inset-0"
            ></BlurView>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#A9A9A9"
                className="absolute top-[47%] left-[47%] z-[100]"
              />
            )}
          </View>
        )}
      </View>
      <View className="h-[15%] relative w-full">
        {sphotoUri ? (
          <>
            <TouchableOpacity
              className="absolute left-7 top-10"
              onPress={retake}
            >
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
            </TouchableOpacity>
            <TouchableOpacity className="absolute right-7 top-10" onPress={sendFile}>
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
                  <Text className="m-[10px] text-white text-lg absolute left-[13%] top-[-3]">
                    Post bitesy
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          !loading && (
            <>
              <View className="absolute left-[20%] top-10">
                <TouchableOpacity
                  className="w-[200px] h-[50px] text-white"
                  onPress={toggleFlashMode}
                >
                  <Image
                    source={
                      flashMode === Camera.Constants.FlashMode.off
                        ? flashOffImage
                        : flashOnImage
                    }
                  />
                </TouchableOpacity>
              </View>
              <View className="absolute left-[41%] top-6">
                <TouchableOpacity
                  className="w-[200px] h-[50px] text-white rounded-[100%]"
                  onPress={!second ? handlePress : takePicture}
                >
                  <Image source={require("../assets/icons/camera.png")} />
                </TouchableOpacity>
              </View>
              <View className="absolute right-[-83] top-10">
                <TouchableOpacity
                  onPress={toggleCameraType}
                  className="w-[200px] h-[50px] text-white"
                >
                  <Image source={require("../assets/icons/flip.png")} />
                </TouchableOpacity>
              </View>
            </>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
