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
import { set } from 'react-native-reanimated';


Tts.getInitStatus().then(() => {
    // ...
  }, (err) => {
    if (err.code === 'no_engine') {
      Tts.requestInstallEngine();
    }
});

Tts.setDefaultLanguage('te')

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
}

{/* Lesson SCREEN */}
function ReviewLessonScreen({route}) {

        const navigation = useNavigation();
        
        const {data} = route.params;
        const {includeIntro} = route.params;
        const {includeLessons} = route.params;
        const {reverse} = route.params;

        //count for current card
        const [count, setCount] = React.useState(0);
        const [done, setDone] = React.useState(false);
        const [show, setShow] = React.useState(false);
        
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
        let tempNum=0;
        const [reorder, setReorder] = React.useState([]);
  
        React.useEffect(() => {
            async function checkData() {
                for(let i = 0 ; i<data.length; i++){
                    //check if intro or lesson
                    database().ref(data[i]).child("Description").once('value').then((snapshot) => {
                        let description = snapshot.val();
                        if((description=='Introduction' && includeIntro==false) || (description=='Lesson' && includeLessons==false)){
                            return;
                        }    
                        else {
                        database()
                        .ref(data[i])
                        .child('Lessons')
                        .once("value")
                        .then((snapshot) => {
                            //get number of categories from db
                            tempNum += snapshot.numChildren();
                            //get categories from db
                            snapshot.forEach((child) => {
                                tempCat.push(child.key);
                                tempFlav.push(child.child("Flavour").val())
                                tempTr.push(child.child("Translation").val())
                                tempPr.push(child.child("Pronunciation").val())
                            });
                            setCategories(tempCat);
                            setFlavour(tempFlav);
                            setTranslation(tempTr);
                            setPronunciation(tempPr);
                            setNumCategories(tempNum);
                            setReorder(shuffle([...Array(tempNum).keys()]));
                            });
                        }
                        
                    });
                }
                setDone(true);

            }
            checkData();
                
        }, []);


        return (
            <SafeAreaView style={{...styles.categories, backgroundColor: 'white'}}>

                {numCategories && translation && flavour && pronunciation && (reorder.length==numCategories) && done ? (
                    
                <View style={styles.categoryButtonContainer}>

                    {categories[reorder[count]].length > 6 ? (
                        <Text style={[styles.word, {fontSize: 400/categories[reorder[count]].length}]}>{!reverse || (show && reverse) ? (categories[reorder[count]]):("-")}</Text>
                    ):(
                        <Text style={styles.word}>{!reverse || (show && reverse) ? (categories[reorder[count]]):("-")}</Text>
                    )}
                    {pronunciation[reorder[count]].length > 15 ? (
                        <Text style={[styles.pronunciation, {fontSize: 500/pronunciation[reorder[count]].length}]}>{!reverse || (show && reverse) ? (pronunciation[reorder[count]]):("Tap below")}</Text>
                    ):(
                        <Text style={styles.pronunciation}>{!reverse || (show && reverse) ? (pronunciation[reorder[count]]): ("Tap below")}</Text>
                    )}
                    {translation[reorder[count]].length > 20 ? (
                        <Text style={[styles.translation, {fontSize: 400/translation[reorder[count]].length}]}>{reverse || (show && !reverse) ? (translation[reorder[count]]):("")}</Text>
                    ):(
                        <Text style={styles.translation}>{reverse || (show && !reverse) ? (translation[reorder[count]]):("")}</Text>
                    )}
                    <Text style={styles.flavour} onPress={() => setShow(true)}>{reverse || (show && !reverse) ? (flavour[reorder[count]]):("Tap to reveal")}</Text>


                    <LessonButton
                        title="Hear"                        
                        onPress={() => Tts.speak(pronunciation[reorder[count]])}                        
                    />

                    <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
                        <LessonButton
                            title="Back"
                            onPress={() => (count == (0) ? (navigation.goBack()): (setCount(count - 1), setShow(false)))}
                        />
                        <Text style={styles.position}>{count+1}/{numCategories}</Text>
                        <LessonButton
                            title="Next"
                            onPress={() => (count == (numCategories-1) ? (navigation.goBack()): (setCount(count + 1), setShow(false)))}
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

export default ReviewLessonScreen;