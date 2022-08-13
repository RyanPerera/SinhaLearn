import * as React from 'react';
import { 
  Button,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator
 } 
from 'react-native';
import database from '@react-native-firebase/database';
import { 
    NavigationContainer,
    useNavigation
 } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryButton from './CategoryButton';
import getData, {CompletedPath} from '../components/Paths';

function CategoryCard (props) {

    const [check, setCheck] = React.useState(null);
    const [done, setDone] = React.useState(false);

    React.useEffect(() => {
        async function checkData() {
            const data = await getData(props.path);
            setCheck(data);
        }
        checkData();
        setDone(true);
    }, []);

    
    const navigation = useNavigation();
    return (

        <View style={{
            flex: 1,
            width: 200,
            alignItems: 'center', 
            justifyContent: 'center'
        }}>
        {done ? (
        <CategoryButton
            title= {props.level}
            subtitle={props.desc}
            check = {check}
            //props to send path for card retrieval
            onPress={() => {navigation.navigate('Lesson', {...props})}}
        />
        ):(
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#99ff99" />
            </View>
        )}
        </View>
    );
}

{/* STYLESHEET */}
const styles = StyleSheet.create({
    categories: {
      flex: 1,
    },
    text: {
      fontSize: 42,
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default CategoryCard;