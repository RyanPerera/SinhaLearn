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
import LessonButton from '../components/LessonButton';
import Tts from 'react-native-tts';
import {CompletedPath} from '../components/Paths';


Tts.getInitStatus().then(() => {
    // ...
  }, (err) => {
    if (err.code === 'no_engine') {
      Tts.requestInstallEngine();
    }
});

Tts.setDefaultLanguage('te')

{/* Lesson SCREEN */}
function LessonScreen({route}) {

        const navigation = useNavigation();

        //get current path
        const {path} = route.params;
        
        // pull card info
        const [categories, setCategories] = React.useState(null);
        const [translation, setTranslation] = React.useState(null);        
        const [pronunciation, setPronunciation] = React.useState(null);        
        const [flavour, setFlavour] = React.useState(null);
        const[numCategories, setNumCategories] = React.useState(0);

        let tempCat = [];
        let tempFlav = [];
        let tempTr = [];
        let tempPr = [];
        let tempNum;

        //count for current card
        const [count, setCount] = React.useState(0);
    
        React.useEffect(() => {
            database()
              .ref()
              .child(path)
              .child('Lessons')
              .once("value")
              .then((snapshot) => {
                    //get number of categories from db
                    tempNum = snapshot.numChildren();
                    //get categories from db
                    snapshot.forEach((child) => {
                        tempCat.push(child.key);
                        tempFlav.push(child.child("Flavour").val())
                        tempTr.push(child.child("Translation").val())
                        tempPr.push(child.child("Pronunciation").val())
                    });
                    //set states to allow variable use in  component
                    setCategories(tempCat);
                    setFlavour(tempFlav);
                    setTranslation(tempTr);
                    setPronunciation(tempPr);
                    setNumCategories(tempNum)
                });
            }, []);


        return (
            <SafeAreaView style={{...styles.categories, backgroundColor: 'white'}}>

                {numCategories && translation && flavour && pronunciation ? (

                <View style={styles.categoryButtonContainer}>

                    {categories[count].length > 6 ? (
                        <Text style={[styles.word, {fontSize: 400/categories[count].length}]}>{categories[count]}</Text>
                    ):(
                        <Text style={styles.word}>{categories[count]}</Text>
                    )}
                    {pronunciation[count].length > 15 ? (
                        <Text style={[styles.pronunciation, {fontSize: 500/pronunciation[count].length}]}>{pronunciation[count]}</Text>
                    ):(
                        <Text style={styles.pronunciation}>{pronunciation[count]}</Text>
                    )}
                    {translation[count].length > 20 ? (
                        <Text style={[styles.translation, {fontSize: 400/translation[count].length}]}>{translation[count]}</Text>
                    ):(
                        <Text style={styles.translation}>{translation[count]}</Text>
                    )}
                    <Text style={styles.flavour}>{flavour[count]}</Text>
                    <LessonButton
                        title="Hear"                        
                        onPress={() => Tts.speak(pronunciation[count])}                        
                    />

                    <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
                        <LessonButton
                            title="Back"
                            onPress={() => (count == (0) ? (navigation.goBack()): (setCount(count - 1)))}
                        />
                        <Text style={styles.position}>{count+1}/{numCategories}</Text>
                        <LessonButton
                            title="Next"
                            onPress={() => (count == (numCategories-1) ? (navigation.goBack(), CompletedPath(path)): (setCount(count + 1)))}
                        />
                    </View>
                </View>
                          
                ):(

                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#99ff99" />
                </View>

                )}

            </SafeAreaView>
          );
}

{/* STYLESHEET */}
const styles = StyleSheet.create({
    categories: {
        flex: 1,
    },
    categoryButtonContainer: {
        flex: 1,
        elevation: 30,
        backgroundColor: "#d9d9d9",
        borderRadius: 10,
        width: '85%',
        alignSelf: 'center',
        margin: 50
    },
    word: {
        fontSize: 80,
        color: "#000",
        fontWeight: "bold",
        alignSelf: 'stretch',
        paddingTop: 50,
        paddingLeft: 50,
        paddingRight: 50,
        textAlign: 'left',
        fontFamily: 'sans-serif',
        flex: 1,
    },
    pronunciation: {
        fontSize: 30,
        color: "#000",
        paddingLeft: 50,
        paddingRight: 50,
        textAlign: 'left',
        fontFamily: 'sans-serif',
        flex: 0.5
    },
    translation: {
        fontSize: 25,
        color: "#000",
        paddingLeft: 50,
        paddingRight: 50,
        textAlign: 'left',
        fontFamily: 'sans-serif',
        flex: 0.5
    },
    flavour: {
        fontSize: 20,
        color: "#000",
        alignSelf: 'stretch',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 50,
        textAlign: 'left',
        fontFamily: 'sans-serif',
        flex: 1.75
    },
    position: {
        fontSize: 20,
        color: "#000",
        fontFamily: 'sans-serif',
        textAlign: 'center',
        flex: 1,
        paddingTop: 15
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

export default LessonScreen;