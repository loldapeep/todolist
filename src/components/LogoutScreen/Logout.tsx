import { Alert, View, Text, TouchableOpacity, Image } from "react-native";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { removeUser } from "../../store/user.reducer";
import app, { db } from "../../../firebaseconfig";
import { getAuth, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import ChangeProfilePictureModal from "./ChangeProfilePictureModal";

export const Logout = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string>("");

  const getProfilePicture = async () => {
    const urlAvatar = (await getDoc(doc(db, "users", `${user.email}`))).data()
      .profilePictureURL;
    setProfilePicture(urlAvatar);
    return urlAvatar;
  };

  useEffect(() => {
    getProfilePicture();
  }, [profilePicture]);

  const closeModal = () => {
    setIsModal(false);
    getProfilePicture();
  };
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  return (
    <View style={{ paddingTop: 50, alignItems: "center", height: '100%' }}>
      <View>
        {profilePicture != "" ? (
          <Image width={200} height={200} source={{ uri: profilePicture }} />
        ) : (
          <Image
            width={200}
            height={200}
            source={require("../../assets/Images/defaultpfp.jpg")}
          />
        )}
      </View>
      <TouchableOpacity onPress={() => setIsModal(true)}>
        <Text>Change Profile Pic</Text>
      </TouchableOpacity>
      <View>
        <Text>{user.email}</Text>
      </View>
      <TouchableOpacity
        style={{
          width: "100%",
          alignItems: "center",
          backgroundColor: "#6d63ff",
          height: 50,
          justifyContent: "center",
        }}
        onPress={async () => {
          const auth = getAuth(app);
          await signOut(auth);
          dispatch(removeUser());
          Alert.alert("Logout Success");
        }}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
      <ChangeProfilePictureModal visibleModal={isModal} onClose={closeModal} />
    </View>
  );
};
