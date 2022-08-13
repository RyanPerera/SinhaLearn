import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

{/* BUTTON */}
const RoundButton = ({ onPress, title }) => {
    return(
        <TouchableOpacity
        activeOpacity={0.2}
        onPress={onPress}
        style={styles.roundButtonContainer}
        >
        <Text style={styles.roundButtonText}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = {
    roundButtonContainer: {
      backgroundColor: "#ff9999",
      borderRadius: 50,
      width: 60,
      height: 60,
      alignSelf: 'center',
      position: 'absolute',
      right: 30,
      bottom: 30
    },
    roundButtonText: {
      fontSize: 45,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: 'stretch',
      textAlign: 'center',
      fontFamily: 'sans-serif',
    }
};

export default RoundButton;