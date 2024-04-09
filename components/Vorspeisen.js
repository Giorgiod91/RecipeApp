import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { category } from "../components/categories";
import { EvilIcons, AntDesign } from "@expo/vector-icons";

const Vorspeisen = () => {
  return (
    <View>
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.CardLinearGradientContainer}
          colors={["#FFFFFF", "#FFFFFF"]}
        >
          <ImageBackground style={styles.CardImageBG}>
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
              <Text style={styles.buttonText}>Rezepte Anzeigen</Text>
            </Pressable>
          </ImageBackground>
        </LinearGradient>
      </View>
    </View>
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
    backgroundColor: "white",
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
});

export default Vorspeisen;
