import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import RezeptForm from "../components/RezeptForm";

const AddRecipe = () => {
  const [rezepte, setRezepte] = useState([]);
  const addRecipeToFirebase = async (formData) => {
    try {
      const recipeRef = await addDoc(
        collection(FIREBASE_DB, "rezepte"),
        formData
      );
      console.log("Recipe added successfully with ID:", recipeRef.id);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  useEffect(() => {
    const recipeRef = collection(FIREBASE_DB, "rezepte");
    const subscriber = onSnapshot(recipeRef, {
      next: (snapshot) => {
        console.log("update");
        const rezepte = [];
        snapshot.docs.forEach((doc) => {
          rezepte.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setRezepte(rezepte);
      },
    });
    return () => subscriber();
  }, []);

  return (
    <View>
      <Text style={styles.text}>Rezept HinzuFügen</Text>
      <View>
        <RezeptForm onSubmit={addRecipeToFirebase} />
      </View>
      <View>
        <Text>Meine Rezepte</Text>
        {rezepte.map((rezept) => (
          <View key={rezept.id}>
            <Text>{rezept.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "red",
    fontSize: 30,
  },
});

export default AddRecipe;
