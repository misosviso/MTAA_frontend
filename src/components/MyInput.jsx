import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';


const MyInput = function ({onChangeText, styles, text, contentType, hideSymbols, inputRef}) {

  return (
    <Pressable>
      <View style={styles.form}>
        <Text style={styles.label}>{text}</Text>
        <TextInput
            ref={inputRef}
            onChangeText={(text) => {onChangeText(text)}}
            autoCapitalize="none"
            autoCompleteType="password"
            style={styles.textInput}
            textContentType={contentType}
            autoCorrect={false}
            returnKeyType="done"
            secureTextEntry={hideSymbols}
        />
      </View>
    </Pressable>
  );
}

export default MyInput;