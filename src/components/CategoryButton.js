import React from 'react';
import { 
  useFocusEffect } from '@react-navigation/native';
import { Text, TouchableOpacity, Image, View } from 'react-native';

{/* BUTTON */}
const CategoryButton = ({ onPress, title, subtitle, check}) => {
  
    return(
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={check? (styles.categoryButtonContainerComp):(styles.categoryButtonContainer)}
            >
            {check? (
                <Image style={styles.checkmark}
                    source={require('../images/checkmark.png')}
                />)
                :(<Image style={styles.checkmark}
            />)}
            <Text style={styles.categoryButtonText}>{title}</Text>
            <Text style={styles.text}>{subtitle}</Text>
            
          </TouchableOpacity>
    )
};

const styles = {
    checkmark: {
        width: 35,
        height: 35,
        position: 'absolute',
        left: 155,
        top: 105,
        opacity: 0.7
      },
    categoryButtonContainer: {
      elevation: 20,
      backgroundColor: "#99cc00",
      borderRadius: 10,
      width: 200,
      height: 150,
      justifyContent: 'center'
    },
    categoryButtonContainerComp: {
        elevation: 0,
        backgroundColor: "#608000",
        borderRadius: 10,
        width: 200,
        height: 150,
        justifyContent: 'center'
      },
    categoryButtonText: {
      fontSize: 20,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: 'stretch',
      paddingLeft: 20,
      textAlign: 'left',
      fontFamily: 'sans-serif'
    },
    text: {
        fontSize: 15,
        color: "#fff",
        paddingLeft: 20,
        paddingBottom: 15,
        paddingRight: 20
    },
};

export default CategoryButton;