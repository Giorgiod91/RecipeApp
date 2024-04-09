import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebaseConfig";
import { Picker } from "@react-native-picker/picker";

const RezeptForm = ({ onSubmit }) => {
  const [didSubmit, setDidSubmit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const categories = ["Vorspeise", "Hauptspeise", "Nachspeise"];
  const [category, setCategory] = useState(categories[0]);
  // Check if the title is too long to prevent sql injection
  const checkForSecurity = (title) => {
    if (title.length > 55) {
      alert("too long");
      return false;
    }
    return true;
  };
  const pickImage = async () => {
    setIsLoading(true);

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

  const uploadImageAsync = async (uri, recipeId) => {
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
      // Generate a unique filename including the recipeId
      const filename = `recipe_${recipeId}_${Date.now()}.jpg`;

      // Upload the image to Firebase Storage
      const storageRef = ref(storage, `Images/${filename}`);
      const result = await uploadBytesResumable(storageRef, blob);
      blob.close();

      // Return the download URL of the uploaded image
      return await getDownloadURL(storageRef);
    } catch (e) {
      alert(e);
    }
  };

  const handleSubmit = async () => {
    if (!didSubmit) {
      if (!checkForSecurity(title)) {
        return;
      }
      const uploadURL = await uploadImageAsync(image);
      onSubmit({
        title,
        description,
        ingredients,
        instructions,
        category,
        image: uploadURL,
      });
      setDidSubmit(true);
      setTitle("");
      setDescription("");
      setIngredients("");
      setInstructions("");
      setImage(null);
    }
  };

  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View>
        <Text>No access to camera{permission?.status}</Text>
        <StatusBar style="auto" />
        <Button title="Request Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.CardLinearGradientContainer}
        colors={["#FFFFFF", "#FFFFFF"]}
      >
        <Text>Title:</Text>
        <TextInput value={title} onChangeText={setTitle} />

        <Text>Category:</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {categories.map((cat, index) => (
            <Picker.Item label={cat} value={cat} key={index} />
          ))}
        </Picker>
        <TextInput value={title} onChangeText={setTitle} />

        <Text>Description:</Text>
        <TextInput value={description} onChangeText={setDescription} />

        <Text>Ingredients:</Text>
        <TextInput value={ingredients} onChangeText={setIngredients} />

        <Text>Instructions:</Text>
        <TextInput value={instructions} onChangeText={setInstructions} />
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.pickImageButton}>Pick an Image</Text>
        </TouchableOpacity>

        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}

        <Button title="Submit" onPress={handleSubmit} />
      </LinearGradient>

      <View></View>
    </View>
  );
};

const styles = {
  CardLinearGradientContainer: { borderRadius: 20, padding: 15, margin: 10 },
};

export default RezeptForm;
