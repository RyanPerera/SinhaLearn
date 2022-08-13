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
import { NavigationContainer,
  useFocusEffect} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryCard from '../components/CategoryCard';

{/* CATEGORY SCREEN */}
function CategoryScreen({route, navigation}) {

    const [categories, setCategories] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const[numCategories, setNumCategories] = React.useState(0);
    const { level } = route.params;

    let tempCat = [];
    let tempDesc = [];
    let tempNum;

    const [enter, setEnter] = React.useState(null);

    useFocusEffect(
      React.useCallback(() => {

        setEnter(true);
        let tempCat = [];
        let tempDesc = [];
        let tempNum;
        
        database()
          .ref()
          .child(level)
          .once("value")
          .then((snapshot) => {
                //get number of categories from db
                tempNum = snapshot.numChildren();
                //get categories from db
                snapshot.forEach((child) => {
                    tempCat.push(child.key);
                    tempDesc.push(child.child("Description").val());
                });
                //set states to allow variable use in  component
                setCategories(tempCat);
                setDescription(tempDesc);
                setNumCategories(tempNum)
            });

            return () => {
              setEnter(false);
            };
        }, [])
    );

        
        return (
            <SafeAreaView style={styles.categories}>
              {/* Horizontal Scrollbox for Main Categories */}
              {categories && description ? (
              <ScrollView horizontal={true} style={styles.scrollView}>
                <View style={{ 
                  width: numCategories*250, 
                  flexDirection: 'row',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  paddingLeft: 40,
                  paddingRight: 40, 
                  paddingBottom: 50,
                  backgroundColor: 'white' }}>
      
                  {/* Map categories from db to clickable level cards + description of each category*/}
                  {enter? (
                  categories.map((element, i) => {
                    return <CategoryCard key={i} level={element} desc={description[i]} path = {level+"/"+categories[i]}/>;
                  })
                  ):
                (
                  <View style={[styles.container, styles.horizontal]}>
                      <ActivityIndicator size="large" color="#99ff99" />
                  </View>
                )}

      
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

export default CategoryScreen;