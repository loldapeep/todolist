import { useState } from "react";
import { View, Button } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Modal } from "react-native-paper";

type Props = {
  visibleModal: boolean;
  onChoose: (e: any) => void;
  onClose: () => void;
};

const ChooseLocationModal = ({ visibleModal, onChoose, onClose }: Props) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleAddMarker = () => {
    onChoose(currentLocation);
  };
  return (
    <Modal visible={visibleModal} style={{ padding: 50 }}>
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <MapView
          style={{
            width: "100%",
            height: "94.5%",
          }}
          onRegionChange={(region) => {
            setCurrentLocation(region);
          }}
        >
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            pinColor="green"
          ></Marker>
          {/* {markers.map((item) => (
            <Marker
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            ></Marker>
          ))} */}
        </MapView>

        <Button title="Choose Location" onPress={handleAddMarker}></Button>
        <Button title="Close" onPress={handleAddMarker}></Button>

      </View>
    </Modal>
  );
};

export default ChooseLocationModal;
