import { StatusBar } from "expo-status-bar";
import TodoList from "./components/TodoList";
import DetailsScreen from "./components/DetailsScreen";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LogoTitle from "./components/LogoTitle";
import { Button } from "react-native";
import { Home2, Firstline } from "iconsax-react-native";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  // const Stack = createNativeStackNavigator();
  const [count, setCount] = React.useState(0);

  let inc = () => {
    setCount(count + 1);
  };

  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //   screenOptions={{            headerStyle: {
    //     backgroundColor: "#ffffff",
    //   },
    //   headerTintColor: "#000000",
    //   headerTitleStyle: {
    //     fontWeight: "bold",
    //   },}}
    //   initialRouteName="List">
    //     <Stack.Screen
    //       name="List"
    //       component={TodoList}
    //       options={{
    //         headerTitle: () => <LogoTitle/>
    //       }}
    //     />
    //     <Stack.Screen
    //       name="Details"
    //       component={DetailsScreen}
    //       options={{
    //         title: "zz",
    //         headerRight: () =>
    //           (<Button onPress={inc} title={String(count)} color="red"/>)
    //         ,
    //       }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#6d63ff"
        inactiveColor="#000000"
        // barStyle={{backgroundColor:"#6d63ff"}}
      >
        <Tab.Screen
          name="Home"
          component={TodoList}
          options={{
            tabBarIcon: () => <Home2 color="#6d63ff" />,
          }}
        />

        <Tab.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            tabBarIcon: () => <Firstline color="#6d63ff" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({

// });
