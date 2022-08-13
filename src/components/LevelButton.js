import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

{/* BUTTON */}
const LevelButton = ({ onPress, title, colour }) => {
    return(

        <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{ ...styles.levelButtonContainer, backgroundColor: colour }}
        
        >
        <Text style={styles.levelButtonText}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = {
    levelButtonContainer: {
      elevation: 10,
      backgroundColor: "#99ccff",
      borderRadius: 10,
      width: 350,
      height: 350,
      justifyContent: 'center',
    },
    levelButtonText: {
      fontSize: 25,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: 'stretch',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }
};

export default LevelButton;