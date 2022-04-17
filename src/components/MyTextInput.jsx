import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';


const MyTextInput = function ({styles, text, onChangeText, inputRef}) {

  return (
    <Pressable>
      <View style={styles.textInputForm}>
        <Text style={styles.label}>{text}</Text>
          <TextInput
            ref={inputRef}
            onChangeText={(text) => {onChangeText(text)}}
            style={styles.textInput}
            autoCorrect={false}
            returnKeyType="done"
            blurOnSubmit={true}
            multiline={true}
        />
      </View>
    </Pressable>
  );
}

export default MyTextInput;