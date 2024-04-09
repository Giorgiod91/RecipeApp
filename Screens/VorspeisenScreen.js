import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Vorspeisen from "../components/Vorspeisen";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const VorspeisenSpeisenScreen = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "rezepte"));
      // Filter the categories to only show the Nachspeise category we map over the fetched data in this case my database
      const categoryData = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((recipe) => recipe.category === "Vorspeise");
      setCategories(categoryData);
    };
    fetchCategories();
  }, []);

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
      {categories.map((category) => (
        <View key={categories} style={styles.container}>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLinearGradientContainer}
            colors={["#FFFFFF", "#FFFFFF"]}
          >
            <ImageBackground
              source={{ uri: category.image }}
              style={styles.CardImageBG}
              width={200}
              height={200}
            >
              <TouchableOpacity
                onPress={() => {
                  setIsClicked(!isClicked);
                }}
                style={styles.iconContainer}
              >
                <EvilIcons name="star" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon2}
                onPress={() => navigation.navigate("RezeptInfo")}
              >
                <AntDesign name="profile" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.text}></Text>
              <Pressable
                onPress={() => navigation.navigate("Vorspeisen")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{category.title}</Text>
              </Pressable>
            </ImageBackground>
            <Button
              style={styles.button}
              title="Details"
              onPress={() => handleDetailsPress(category)}
            />
          </LinearGradient>
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
});

export default VorspeisenSpeisenScreen;
