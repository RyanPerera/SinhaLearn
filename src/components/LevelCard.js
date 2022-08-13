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
  ToastAndroid
 } 
from 'react-native';
import { 
    NavigationContainer,
    useNavigation,
 } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LevelButton from './LevelButton';

function LevelCard (props){

    const showToast = () => {
        ToastAndroid.showWithGravity(
            "Coming Soon!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )};
    
    const navigation = useNavigation();
    return (
        <View style={{
            flex: 1,
            width: 400,
            alignItems: 'center', 
            justifyContent: 'center'
        }}>
        <LevelButton
            title={props.level}
            colour={props.level=='More to Come' ? ("#ff6666"):("#99ccff")}
            onPress={() => props.level == 'More to Come' ? (showToast()): (navigation.navigate('Category', {...props}))}
        />
        </View>
    );
}

{/* STYLESHEET */}
const styles = StyleSheet.create({
    categories: {
      flex: 1,
    },
    scrollView: {
    },
    text: {
      fontSize: 42,
    }
});

export default LevelCard;