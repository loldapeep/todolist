import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RootState, useAppSelector } from "../store";
import TodoList from "../components/TodoScreen/TodoList";
import DetailsScreen from "../components/DetailsScreen/DetailsScreen";
import { Firstline, Home2, Setting2 } from "iconsax-react-native";
import Login from "../components/Login";
import { Logout } from "../components/LogoutScreen/Logout";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={TodoList} />
      <Stack.Screen
        options={{ headerShown: true }}
        name="Details"
        component={DetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
