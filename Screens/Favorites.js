import { View, Text } from "react-native";
import React from "react";
import RezeptFetch from "../components/RezeptFetch";

const Favorites = () => {
  return (
    <View>
      <Text>Favoriten</Text>
      <RezeptFetch />
    </View>
  );
};

export default Favorites;
