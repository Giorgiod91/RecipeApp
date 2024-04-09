import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";
import Ideen from "../components/ideen";
import Categories from "../components/categories";
import HinzuFügenScreen from "./AddRecipe";
import HinzuFügen from "../components/HinzuFügen";
import NavBar from "../components/NavBar";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const bgPicture = require("../img/etagg.webp");
  return (
    <SafeAreaView style={styles.container} className="">
      <View className="flex-row pb-3 items-center mx-4 space-x-2  ">
        <Image
          source={bgPicture}
          style={{
            width: 450,
            height: 140,
            borderRadius: 20,
            backgroundColor: "slategray",
          }}
        />

        <View className="">
          <HinzuFügen />
        </View>
      </View>

      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <FontAwesome
            onPress={() => navigation.navigate("Search")}
            name="search"
            size={20}
            color="black"
          />

          <TextInput placeholder="Rezepte Suchen" keyboardType="default" />
        </View>
      </View>
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Ideen />
        <View className="mt-4 flex-row items-center justify-between px-4">
          <Categories />
        </View>
      </ScrollView>
      <View className="flex justify-between">
        <NavBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  orangeFarbe: {
    color: "orange",
    fontSize: 24,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default HomeScreen;
