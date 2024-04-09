import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign, SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavBar = ({}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={styles.iconContainer}
      >
        <SimpleLineIcons name="home" size={24} color="black" />
        <Text style={styles.text}>Home</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Favoriten")}
        style={styles.iconContainer}
      >
        <FontAwesome name="star-o" size={24} color="black" />
        <Text style={styles.text}>Favoriten</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff8dc",
  },
  iconContainer: {
    marginRight: 80,
    marginLeft: 80,
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    alignItems: "center",
  },
});

export default NavBar;
