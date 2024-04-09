import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const RezeptInfo = () => {
  const route = useRoute();
  const { title, description, instructions, ingredients, image } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recipe Title: {title}</Text>
      <Text style={styles.text}>Description: {description}</Text>
      <Text style={styles.text}>Instructions: {instructions}</Text>
      <Text style={styles.text}>Ingredients: {ingredients}</Text>

      <Image source={{ uri: image }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    margin: 10,
  },
  text: {
    border: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default RezeptInfo;
