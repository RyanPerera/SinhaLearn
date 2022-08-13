import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

{/* BUTTON */}
const AppButton = ({ onPress, title }) => {
    return(
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.appButtonContainer}
        >
        <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = {
    appButtonContainer: {
      elevation: 10,
      backgroundColor: "#ff9966",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      width: 300
    },
    appButtonText: {
      fontSize: 25,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: 'stretch',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }
};

export default AppButton;