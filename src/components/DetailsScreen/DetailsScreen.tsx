import { StyleSheet } from "react-native";
import { Button, View, Text, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
const DetailsScreen = ({ route }) => {
  return route.params && route.params.item ? (
    <>
      <Text style={styles.categories}>Task Name</Text>
      <Text style={styles.data}>{route.params.item.name}</Text>

      <Text style={styles.categories}>Task Type</Text>
      <Text style={styles.data}>{route.params.item.type.label}</Text>

      <Text style={styles.categories}>Active</Text>
      <Text style={styles.data}>{route.params.item.active ? "Yes" : "No"}</Text>

      <Text style={styles.categories}>Location</Text>
      <MapView
        style={{ width: "100%", flex:1, }}
        region={{
          latitude: route.params.item.location.latitude,
          longitude: route.params.item.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: route.params.item.location.latitude,
            longitude: route.params.item.location.longitude,
          }}
        ></Marker>
      </MapView>
      {/* <Text>{JSON.stringify(route.params.item)}</Text> */}
    </>
  ) : (
    <SafeAreaView>
      <Text>No data</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categories: {
    fontSize: 18,
    marginTop: 25,
    marginLeft: 20,
  },
  data: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 20,
  },
});

export default DetailsScreen;
