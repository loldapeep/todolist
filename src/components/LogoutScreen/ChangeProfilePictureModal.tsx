import { TouchableOpacity, Text, Alert, View } from "react-native";
import { Modal } from "react-native-paper";
import { db, firebaseStorage } from "../../../firebaseconfig";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAppSelector, RootState } from "../../store";
import * as ImagePicker from "expo-image-picker";
import { CloseCircle } from "iconsax-react-native";

type Props = {
  visibleModal: boolean;
  onClose: VoidFunction;
};

const ChangeProfilePictureModal = ({ visibleModal, onClose }: Props) => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const pickImageAsync = async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    } else {
      Alert.alert("Please choose a photo");
    }
    onClose();
  };

  const useCameraAsync = async () => {
    ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    } else {
      Alert.alert("Please take a photo");
    }

    onClose();
  };

  const uploadImage = async (uri: string) => {
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    // const avatarName = uuid.v4() as string;
    const fileRef = ref(firebaseStorage, `${user.email}/profilePicture`);
    await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    const avatarUrl = await getDownloadURL(fileRef);
    await setDoc(doc(db, "users", `${user.email}`), {
      profilePictureURL: avatarUrl,
    });
  };
  return (
    <Modal
      visible={visibleModal}
      contentContainerStyle={{ paddingHorizontal: 30, backgroundColor: "white" }}
    >
      <TouchableOpacity onPress={onClose} style={{ marginLeft: 300 }}>
        <CloseCircle size="32" color="#6d63ff" />
      </TouchableOpacity>
      <View style={{flexDirection: "row", justifyContent:"space-around", marginBottom: 20}}>
        <TouchableOpacity onPress={pickImageAsync}>
          <Text>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={useCameraAsync}>
          <Text>Take A Pic</Text>
        </TouchableOpacity>        
      </View>

    </Modal>
  );
};

export default ChangeProfilePictureModal;
