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
  StatusBar
 } 
from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppButton from './src/components/AppButton';
import LevelButton from './src/components/LevelButton';
import HomeScreen from './src/screens/HomeScreen';
import LearnScreen from './src/screens/LearnScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import LessonScreen from './src/screens/LessonScreen';
import ReviewLessonScreen from './src/screens/ReviewLessonScreen';
import RNBootSplash from 'react-native-bootsplash';

{/* STACK NAV */}
const Stack = createStackNavigator();

function App() {

  RNBootSplash.hide();
  
  return (
    <NavigationContainer>
      <StatusBar
          backgroundColor="#ff9966"
          barStyle="light-content"
      />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ff9966',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',   
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="Home" 
          component={HomeScreen}
          options={{
            title: 'SinhaLearn',
          }}
        />
        <Stack.Screen 
          name="Learn" 
          component={LearnScreen}
          options={{
            //headerShown: false
          }}
        />
        <Stack.Screen 
          name="Category" 
          component={CategoryScreen}
          options={{
            title: 'Learn',
            animationEnabled: false
            //headerShown: false
          }}
        />
        <Stack.Screen 
          name="Lesson" 
          component={LessonScreen}
          options={{
            title: 'Learn',
            animationEnabled: false
            //headerShown: false
          }}
        />
        <Stack.Screen 
          name="Review" 
          component={ReviewScreen}
          options={({navigation, route}) => ({

          })}
        />
        <Stack.Screen 
          name="RevLesson" 
          component={ReviewLessonScreen}
          options={{
            title: 'Review',
            animationEnabled: false
            //headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;