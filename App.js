import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import VorspeisenScreen from "./Screens/VorspeisenScreen";

import AddRecipe from "./Screens/AddRecipe";
import Favorites from "./Screens/Favorites";
import RezeptScreen from "./Screens/RezeptScreen";
import NachSpeisenScreen from "./Screens/NachSpeisenScreen";
import HauptspeisenScreen from "./Screens/HauptspeisenScreen";
import SearchScreen from "./Screens/SearchScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          classname="text-orange-400"
          name="Vorspeisen"
          component={VorspeisenScreen}
        />
        <Stack.Screen name="AddRecipe" component={AddRecipe} />
        <Stack.Screen name="Favoriten" component={Favorites} />
        <Stack.Screen name="RezeptInfo" component={RezeptScreen} />
        <Stack.Screen name="Nachspeisen" component={NachSpeisenScreen} />
        <Stack.Screen name="Hauptspeisen" component={HauptspeisenScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
