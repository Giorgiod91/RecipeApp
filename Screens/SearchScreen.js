import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, where } from "firebase/firestore";

import { FIREBASE_DB } from "../firebaseConfig";

const SearchScreen = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  const [clickedCategory, setClickedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      let querySnapshot;
      try {
        if (searchTerm) {
          querySnapshot = await getDocs(
            collection(FIREBASE_DB, "rezepte"),
            where("title", "==", searchTerm)
          );
        } else {
          querySnapshot = await getDocs(collection(FIREBASE_DB, "rezepte"));
        }

        const categoryData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [searchTerm]);

  const handleCardPress = (category) => {
    if (clickedCategory && clickedCategory.id === category.id) {
      setClickedCategory(null); // Hide details if clicked again cause in the return statement we check if clickedCategory is not null
    } else {
      setClickedCategory(category); // Show details for clicked category
    }
  };

  const handleDetailsPress = (category) => {
    navigation.navigate("RezeptInfo", {
      title: category.title,
      description: category.description,
      instructions: category.instructions,
      ingredients: category.ingredients,
      image: category.image,
    });
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <Text>Search Screen</Text>
      <TextInput
        type="text"
        placeholder="Search"
        onChangeText={(text) => setSearchTerm(text)}
      />
      {categories
        .filter((category) => {
          return searchTerm.toLowerCase() === ""
            ? category
            : category.title.toLowerCase().includes(searchTerm);
        })
        .map((category) => (
          <View key={category.id} style={styles.container}>
            <TouchableOpacity onPress={() => handleCardPress(category)}>
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.CardLinearGradientContainer}
                colors={["#FFFFFF", "#FFFFFF"]}
              >
                <ImageBackground
                  source={{ uri: category.image }}
                  style={styles.CardImageBG}
                >
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => {}}
                  >
                    <EvilIcons name="star" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.icon2}
                    onPress={() =>
                      navigation.navigate("RezeptInfo", {
                        recipeId: category.id,
                      })
                    }
                  >
                    <AntDesign name="profile" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.text}>{category.title}</Text>
                  <Pressable
                    onPress={() => handleCardPress(category)}
                    style={styles.button}
                  ></Pressable>
                </ImageBackground>
                <Button
                  title="Details"
                  onPress={() => handleDetailsPress(category)}
                />
                <View style={styles.view}>
                  <Text style={styles.buttonText}>{category.title}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  CardLinearGradientContainer: {
    borderRadius: 25,
    paddingLeft: 50,
    paddingTop: 10,
  },
  CardImageBG: {
    width: 270,
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  icon2: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailsContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchScreen;
