import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_DB } from "../firebaseConfig";
import { addDoc } from "firebase/firestore";

const HinzuFügen = (props) => {
  const navigation = useNavigation();
  const { title = "Neues Rezept +" } = props;

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddRecipe")}
        className="bg-gray-40 p-4 text-xs"
      >
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("AddRecipe")}
        >
          <Text style={styles.text}>{title}</Text>
        </Pressable>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#fff8dc",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});

export default HinzuFügen;
