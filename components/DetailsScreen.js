import { Text, View } from "react-native";
const DetailsScreen = ({ route }) => {
  const itemDetails = route.params;
  return (
    <View style={{ flexDirection: "row", justifyContent:"space-around", paddingTop: 100 }}>
      <Text>{itemDetails.taskName}</Text>
      <Text>{itemDetails.type.label}</Text>
      <Text>{itemDetails.active ? "done" : "not done"}</Text>
      {console.log(itemDetails)}
    </View>
  );
};

export default DetailsScreen;
