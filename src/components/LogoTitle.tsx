import {Image, View, Text} from "react-native";
const LogoTitle = (props) => {
    return (
    <View style={{flexDirection: 'row'}}>
       <Image style={{width:50, height: 50}} source={require('../assets/Images/logo.png') }/> 
       <Text style={{marginLeft: 12, paddingTop: 13, fontWeight: "bold", fontSize: 18}}>To-do list</Text>
    </View>
    );
}

export default LogoTitle;