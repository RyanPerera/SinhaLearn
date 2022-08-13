import * as React from 'react';
import {useRef} from 'react';
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
  ActivityIndicator,
  Image
 } 
from 'react-native';
import { NavigationContainer,
  useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import RoundButton from '../components/RoundButton';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


{/* REVIEW SCREEN */}
function ReviewScreen({navigation}) {

  const menu = useRef();

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();

  const [send, setSend] = React.useState([]);

  const [lvls, setLvls] = React.useState([]);
  const [done, setDone] = React.useState(null);
  const [toggleCheckBox, setToggleCheckBox] = React.useState({})
  const [toggleICheckBox, setToggleICheckBox] = React.useState(0)
  const [toggleLCheckBox, setToggleLCheckBox] = React.useState(0)
  const [toggleRCheckBox, setToggleRCheckBox] = React.useState(0)
  const [showOptions, setShowOptions] = React.useState(false);


  React.useEffect(() => {
    async function checkData() {
      const temp = await AsyncStorage.getAllKeys();
      setLvls(temp);
      setSend(temp);
  }
  checkData();
  setDone(true);
    navigation.setOptions({
      headerRight: () => (
        <Menu 
          ref={menu} 
          animationDuration={20} 
          button={<TouchableOpacity onPress={() => (setShowOptions(!showOptions), showMenu())}>
              <Image style={{height:40, width: 40, marginRight: 10}}
              source={require('../images/navarrow.png')}
              />
            </TouchableOpacity>}>
        <MenuItem onPress={() => hideMenu()}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{}}>     
            <Image style={{height:40, width: 40, tintColor: 'gray', transform: [{rotate: '180deg'}]}}
                  source={require('../images/navarrow.png')}
            />
          </View>
        </MenuItem>
        <MenuDivider/>
        <MenuItem>         
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>     
            <CheckBox
                  //set if intro cards appear in review
                  style={{flex: 1}}
                      tintColors={{ true: '#ff9966', false: '#555' }}
                      disabled={false}
                      value={toggleICheckBox ? true : false}
                      onValueChange={() => 
                        setToggleICheckBox(!toggleICheckBox)}
            />
            <Text 
              style={{...styles.text, fontSize: 15}}
              onPress={() => 
                setToggleICheckBox(!toggleICheckBox)}>
                Include Intros
            </Text>
          </View>
        </MenuItem>
        <MenuDivider/>
        <MenuItem>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>     
              <CheckBox
                    //set if intro cards appear in review
                    style={{flex: 1}}
                        tintColors={{ true: '#ff9966', false: '#555' }}
                        disabled={false}
                        value={toggleLCheckBox ? true : false}
                        onValueChange={() => 
                          setToggleLCheckBox(!toggleLCheckBox)}
              />
              <Text 
                style={{...styles.text, fontSize: 15}}
                onPress={() => 
                  setToggleLCheckBox(!toggleLCheckBox)}>
                  Include Lessons
              </Text>
          </View>
        </MenuItem>
        <MenuDivider/>
        <MenuItem>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>     
              <CheckBox
                    //set if intro cards appear in review
                    style={{flex: 1}}
                        tintColors={{ true: '#ff9966', false: '#555' }}
                        disabled={false}
                        value={toggleRCheckBox ? true : false}
                        onValueChange={() => 
                          setToggleRCheckBox(!toggleRCheckBox)}
              />
              <Text 
                style={{...styles.text, fontSize: 15}}
                onPress={() => 
                  setToggleRCheckBox(!toggleRCheckBox)}>
                  Reverse Cards
              </Text>
          </View>
        </MenuItem>
      </Menu>
      ),
    })
  }, [navigation, showOptions, toggleICheckBox, toggleLCheckBox, toggleRCheckBox]);

    return (

          done && (lvls.length)? (
            
            <View style={{ 
              backgroundColor: 'white', flex: 1, paddingTop: 10 }}>
              
              <ScrollView style={{...styles.scrollView, flex: 1}}>

                {/*
                <View style={{display: showOptions?('flex'):('none')}}>
                  <View style={{flexDirection: 'row', paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-around'}}>
                    <CheckBox
                    //set if intro cards appear in review
                        tintColors={{ true: '#ff9966', false: '#555' }}
                        disabled={false}
                        value={toggleICheckBox ? true : false}
                        onValueChange={() => 
                          setToggleICheckBox(!toggleICheckBox)}
                    />
                    <Text 
                      style={{...styles.text, fontSize: 20, paddingRight: 20}}
                      onPress={() => 
                        setToggleICheckBox(!toggleICheckBox)}>
                        Include Introductions
                    </Text>
                    <CheckBox
                    //set if Lesson cards appear in review
                        tintColors={{ true: '#ff9966', false: '#555' }}
                        disabled={false}
                        value={toggleLCheckBox ? true : false}
                        onValueChange={() => 
                          setToggleLCheckBox(!toggleLCheckBox)}
                    />
                    <Text 
                      style={{...styles.text, fontSize: 20}}
                      onPress={() => 
                        setToggleLCheckBox(!toggleLCheckBox)}>
                        Include Lessons
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', paddingTop: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 10, justifyContent: 'flex-start'}}>
                    <CheckBox
                    //set if intro cards appear in review
                        tintColors={{ true: '#ff9966', false: '#555' }}
                        disabled={false}
                        value={toggleRCheckBox ? true : false}
                        onValueChange={() => 
                          setToggleRCheckBox(!toggleRCheckBox)}
                    />
                    <Text 
                      style={{...styles.text, fontSize: 20, paddingRight: 20}}
                      onPress={() => 
                        setToggleRCheckBox(!toggleRCheckBox)}>
                        Reverse Sinhalese &lt;-&gt; English
                    </Text>
                  </View>
              </View>*/}
                        
                  {lvls.map((element, i) => {
                    return (
                    <View key={i} style={{flexDirection: 'row', paddingTop: 10, paddingLeft: 20}}>
                      <CheckBox
                        tintColors={{ true: '#F15927', false: '#000' }}
                        disabled={false}
                        value={toggleCheckBox[i] ? false : true}
                        onValueChange={() => 
                          (setToggleCheckBox({
                            ...toggleCheckBox,
                            [i] : !toggleCheckBox[i]
                            }),
                            !send.includes(lvls[i]) ? 
                            (setSend(send => send.concat(lvls[i]))) : (setSend(send.filter(item => item !== lvls[i])))
                          )}
                      />

                      <Text 
                        style={styles.text} 
                        value={toggleCheckBox} onPress={() => 
                          (setToggleCheckBox({
                            ...toggleCheckBox,
                            [i] : !toggleCheckBox[i]
                            }),
                            !send.includes(lvls[i]) ? 
                            (setSend(send => send.concat(lvls[i]))) : (setSend(send.filter(item => item !== lvls[i])))
                          )}>
                          {lvls[i]}
                      </Text>
                    </View>
                  )}
                )}
              </ScrollView>
                              
            <RoundButton
              title=">"
              onPress={() => {navigation.navigate('RevLesson', {data:send, includeIntro:toggleICheckBox, includeLessons:toggleLCheckBox, reverse: toggleRCheckBox});}}
            />
              </View>
              ):
            (
              <Text style={styles.emptyText}>Do some lessons first!</Text>
          )
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
      fontSize: 25,
      color: "#555",
      fontFamily: 'sans-serif',
      alignSelf: 'center',
      paddingLeft: 10
    },
    emptyText: {
      fontSize: 25,
      fontStyle: 'italic',
      color: "#9999",
      fontFamily: 'sans-serif',
      alignSelf: 'center',
      textAlignVertical: 'center',
      flex: 1
    }
  });

export default ReviewScreen;