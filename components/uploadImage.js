import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import {
  storage,
  uploadBytes,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../firebaseConfig";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    setIsLoading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uploadURL = await uploadImageAsync(result.assets[0].uri);
      setImage(uploadURL);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    try {
      //  date.now() is used to create a unique name for the image to later be able to use this to retrieve the recipe from the database
      const storageRef = ref(storage, `Images/image-${Date.now()}`);
      const result = await uploadBytesResumable(storageRef, blob);
      blob.close();
      return await getDownloadURL(storageRef);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ paddingHorizontal: 6, width: "100%" }}>
        {!image ? (
          <TouchableOpacity
            style={{
              width: "100%",
              height: 200,
              borderWidth: 2,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={pickImage}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text style={{ color: "white", textAlign: "center" }}>
                Pick an Image
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              overflow: "hidden",
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UploadImage;
