import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RootState, useAppSelector } from "../store";
import TodoList from "../components/TodoList";
import DetailsScreen from "../components/DetailsScreen";
import { Firstline, Home2, Setting2 } from "iconsax-react-native";
import Login from "../components/Login";
import { Logout } from "../components/LogoutScreen/Logout";

const Tab = createMaterialBottomTabNavigator();

const Root = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  return user !== null ? (
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
          <Tab.Screen
          name="Settings"
          component={Logout}
          options={{
            tabBarIcon: () => <Setting2 color="#6d63ff"/>,
          }}
        /> 
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Login"
        activeColor="#6d63ff"
        inactiveColor="#000000"
        // barStyle={{backgroundColor:"#6d63ff"}}
      >
        <Tab.Screen name="Login" component={Login} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Root;

const styles = StyleSheet.create({});
