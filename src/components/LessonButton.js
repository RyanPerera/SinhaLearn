import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

{/* BUTTON */}
const LessonButton = ({ onPress, title }) => {
    return(
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.lessonButtonContainer}
        >
        <Text style={styles.lessonButtonText}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = {
    lessonButtonContainer: {
      backgroundColor: "#ff9900",
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 40,
      marginLeft: 20,
      marginRight: 20,
      width: '30%',
      alignSelf: 'center',
    },
    lessonButtonText: {
      fontSize: 25,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: 'stretch',
      textAlign: 'center',
      fontFamily: 'sans-serif',
    }
};

export default LessonButton;