import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


const MyButton = function ({onPress, text, buttonStyle, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={buttonStyle}>
                <Text style={textStyle}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default MyButton;