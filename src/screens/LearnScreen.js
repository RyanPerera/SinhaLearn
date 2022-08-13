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
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LevelCard from '../components/LevelCard';

{/* LEARN SCREEN */}
function LearnScreen() {

    const [levels, setLevels] = React.useState(null);
    const[numLevels, setNumLevels] = React.useState(0);
    
    let temp = [];
    let tempNum;

    React.useEffect(() => {
            
        database()
          .ref()
          .once("value")
          .then((snapshot) => {
                //get number of levels from db
                tempNum = snapshot.numChildren();
                //get Levels from db
                snapshot.forEach((child) => {
                temp.push(child.key);
                });
                //set states to allow variable use in  component
                setLevels(temp);
                setNumLevels(tempNum)
            });
        }, [])

    return (
      <SafeAreaView style={styles.categories}>
        {/* Horizontal Scrollbox for Main Categories */}
        {levels ? (
        <ScrollView horizontal={true} style={styles.scrollView}>
          <View style={{ 
            width: numLevels*410, 
            flexDirection: 'row',
            alignItems: 'center', 
            justifyContent: 'center',
            paddingLeft: 40,
            paddingRight: 40, 
            paddingBottom: 50,
            backgroundColor: 'white' }}>

            {/* Map levels from db to clickable level cards */}
            {levels.map((element) => {
              return <LevelCard key={element} level={element} />;
            })}

          </View>
        </ScrollView>
         ) : (
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
    scrollView: {
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

export default LearnScreen;