import * as React from 'react';
import { 
  Button,
  View,
  Modal,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Animated,
  useWindowDimensions,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
 } 
from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppButton from '../components/AppButton';
import AsyncStorage from '@react-native-community/async-storage';
import RoundButton from '../components/RoundButton'


{/* HOME SCREEN */}
function HomeScreen({ navigation }) {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [delButtonVisible, setDelButtonVisible] = React.useState(false);

    const showToast = () => {
      ToastAndroid.showWithGravity(
          "Deleted all data.",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
      )};

    return (
      <View style={{ 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'white'
        }}>

        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            (setModalVisible(!modalVisible), setDelButtonVisible(false))
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Welcome to SinhaLearn!</Text>
              <Text style={styles.modalTextH}>F.A.Q.</Text>
              <Text style={styles.modalTextQ}>Q. How do I use this app?</Text>
              <Text style={styles.modalTextA}>A. Simply complete lessons in the <Text style={styles.italic}>Learn</Text> section. 
              As you continue to complete lessons, they will become available for review in the <Text style={styles.italic}>Review</Text> section.
              I recommend completing 1-2 lessons a day and to continue to review them for as long as you need.</Text>
              <Text style={styles.modalTextQ}>Q. I finished all the lessons. Now what?</Text>
              <Text style={styles.modalTextA}>A. Continue reviewing and learning on your own. I will add new lessons whenever I can, so please stay tuned.</Text>
              <Text style={styles.modalTextQ}>Q. How do I delete my data?</Text>

              {delButtonVisible ? (
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ff0000" }}
                onPress={() => {
                  (setDelButtonVisible(!delButtonVisible),  AsyncStorage.clear(), showToast());
                }}
              >
                <Text style={styles.textStyle}>Click only if you're absolutely sure</Text>
              </TouchableHighlight>
              ):(
                <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ff6666" }}
                onPress={() => {
                  setDelButtonVisible(!delButtonVisible);
                }}
              >
                <Text style={styles.textStyle}>Click to delete all data</Text>
              </TouchableHighlight>                
              )}
              <Text style={styles.modalTextQ}>Q. Is SinhaLearn enough to become fluent in Sinhalese?</Text>
              <Text style={styles.modalTextA}>A. No! SinhaLearn is a tool to help introduce and familiarize yourself with grammar and vocabulary. 
              If you want to acquire fluency, this should only be considered supplementary to activities such as consuming Sinhalese media or books,
              or conversing with natives. It's a good way to start though!</Text>


              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3", width: '50%'}}
                onPress={() => {
                  (setModalVisible(!modalVisible), setDelButtonVisible(false))
                }}
                >
                <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
              </View>

              <Text style={{alignSelf: 'center', fontSize: 10, fontStyle: 'italic'}}>App by Ryan Perera</Text>
              
            </View>
          </View>
        </Modal>
        
        <View style={{
          flex: 2,
          height: 100,
          alignItems: 'center', 
          justifyContent: 'center'
        }}>
        <AppButton 
          title="Learn"
          onPress={() => navigation.navigate('Learn')}
        />
        </View>
  
        <View style={{
          flex: 2,
          height: 100,
          alignItems: 'center', 
        }}>
        <AppButton 
          title="Review" 
          //currently clears asyncstorage for testing purposes
          onPress={() => navigation.navigate('Review')}
        />
        </View>
  
        {/* ADD MASCOT HERE WHEN DONE */}
        {/*<View style={{
          flex: 3,
          height: 100,        
          alignItems: 'center',        
          justifyContent: 'flex-start',
        }}>
        <Text></Text>
      </View>*/}
        <RoundButton
            title="?"
            onPress={() => {setModalVisible(true);}}
        />
      </View>
    );
}

{/* STYLESHEET */}
const styles = StyleSheet.create({
  categories: {
    flex: 1,
  },
  italic: {fontStyle: 'italic'},
  scrollView: {
  },
  text: {
    fontSize: 42,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 25,
    paddingTop: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalTextH: {
    marginBottom: 15,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: "center"
  },
  modalTextQ: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "left"
  },
  modalTextA: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: "left"
  }
});

export default HomeScreen;