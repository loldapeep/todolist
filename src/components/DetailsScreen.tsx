import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import ChangeProfilePictureModal from "./LogoutScreen/ChangeProfilePictureModal";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useAppSelector, RootState } from "../store";
const DetailsScreen = () => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
    </View>
  );
};

export default DetailsScreen;
