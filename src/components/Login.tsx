import { Button, Text, TextInput, View, Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import app from "../../firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import React from "react";
import { RootState, useAppDispatch } from "../store";
import { useAppSelector } from "../store";
import { setUser } from "../store/user.reducer";
import { IUserProfile } from "../type/user";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";

const Login = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);

  const formSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email."),
    password: z
      .string()
      .min(8, "Passwords must contain at least 8 characters."),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSignup = (data) => {
    // console.log("data", data);
    // Alert.alert("Info", JSON.stringify(data));
    registerAndLogin(data.email, data.password);
  };

  const onLogin = (data) => {
    // console.log("data", data);
    // Alert.alert("Info", JSON.stringify(data));
    login(data.email, data.password);
  };

  async function registerAndLogin(email, password) {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", `${email}`), {
        email: email,
        password: password,
        profilePictureURL: "",
      });
      login(email, password);

      return;
    } catch (error) {
      Alert.alert("Something went wrong");
    }
  }

  async function login(email, password) {
    try {
      const auth = getAuth(app);
      const response = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login Success");
      let userProfile = {
        email: email,
        password: password,
      };
      // console.log(user);
      dispatch(setUser(userProfile as IUserProfile));
      return;
    } catch (error) {
      Alert.alert("Something went wrong");
    }
  }

  return (
    <View>
      <View
        style={{
          marginTop: 100,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text>Username:</Text>
        <Controller
          control={control}
          name="email"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <TextInput
                style={{ backgroundColor: "#e1e1e1", width: 200 }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {error && <Text style={{ color: "red" }}>{error.message}</Text>}
            </View>
          )}
        />
      </View>
      <View
        style={{
          marginTop: 70,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text>Password:</Text>
        <Controller
          control={control}
          name="password"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <TextInput
                secureTextEntry={true}
                style={{ backgroundColor: "#e1e1e1", width: 200 }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {error && <Text style={{ color: "red" }}>{error.message}</Text>}
            </View>
          )}
        />
      </View>
      <Button title="signup" onPress={handleSubmit(onSignup)} />
      <Button title="login" onPress={handleSubmit(onLogin)} />
    </View>
  );
};

export default Login;
