import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Ideen = () => {
  const navigation = useNavigation();
  const Speisen = [
    {
      name: "Vorspeisen",
      bild: "https://www.kuechengoetter.de/uploads/media/452x452/05/80155-ziegenkaese-canapes.webp?v=1-0",
    },

    {
      name: "Hauptspeisen",
      bild: "https://www.kuechengoetter.de/uploads/media/322x483/03/80153-mini-hamburger.webp?v=2-23",
    },
    {
      name: "Nachspeisen",

      bild: "https://www.kuechengoetter.de/uploads/media/322x483/02/80952-gravity-cake-motivtorte.webp?v=2-19",
    },
  ];

  function checkOnWhatClicked(Speisen) {
    const { name } = Speisen;

    if (name === "Vorspeisen") {
      navigation.navigate("Vorspeisen");
    } else if (name === "Hauptspeisen") {
      navigation.navigate("Hauptspeisen");
    } else if (name === "Nachspeisen") {
      navigation.navigate("Nachspeisen");
    }
  }
  const [clickedIndex, setClickedIndex] = useState(null);
  return (
    <View style={styles.backgroundColor}>
      <View className="p-4">
        <Pressable style={styles.Text2}>
          <Text style={styles.text}>Kategorien</Text>
        </Pressable>
      </View>

      <View className="flex-row items-center p-5 space-x-4  overflow-scroll">
        {Speisen.map((Speisen, index) => (
          <LinearGradient
            key={index}
            colors={["#FFFFFF", "#FFFFFF"]}
            style={styles.CardLinearGradientContainer}
          >
            <TouchableOpacity
              key={index}
              onPress={() => checkOnWhatClicked(Speisen)}
              className="overflow-scroll relative mr-2 "
            >
              <Image
                source={{ uri: Speisen.bild }}
                style={styles.Image}
                className="w-20 h-20 "
              />
              <Text className="absolute bottom-1 left-1 text-white font-bold">
                {Speisen.name}
              </Text>

              {clickedIndex === index && (
                <View>
                  <Text>Zeit: {Speisen.zeit}</Text>
                  <Text>Schwierigkeit: {Speisen.schwierigkeit}</Text>
                </View>
              )}
            </TouchableOpacity>
          </LinearGradient>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardLinearGradientContainer: { borderRadius: 20, padding: 15, margin: 10 },
  CardImageBG: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
  },
  backgroundColor: {
    backgroundColor: "white",
  },
  Text2: {
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
  Image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default Ideen;
