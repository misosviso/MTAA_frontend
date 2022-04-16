import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Components
import Separator from '../components/Separator';
import MyButton from '../components/MyButton';
import * as SecureStore from 'expo-secure-store';
import useStyles from '../styles';
import MyInput from '../components/MyInput';

export default function Login() {

  const styles = useStyles();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  function navigateHome() {
    navigation.navigate("Home")
  }

  SecureStore.getItemAsync('userToken')
  .then((token) => {
      if(token){
        navigateHome()
      }
  })

  function login() {

    nameInput.current.clear()
    pswdInput.current.clear()

    if (!username) {
      Alert.alert("Login failed", "username is required")
      return
    } 

    if (!password) {
      Alert.alert("Login failed", "password is required")
      return
    }

    const user = {
      username: username,
      password: password
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('https://mtaa-apina.herokuapp.com/login/', options)
      .then(res => res.json())
      .then(data => {
          if(data.token){
            SecureStore.setItemAsync("userToken", data.token)
            navigateHome()  
            return
          } 
          Alert.alert("Login failed", "username or password is incorrect")
          
      })
      .catch(error => console.log(error))
  }

  function navigateRegister() {
    navigation.navigate("Register");
  }

  const nameInput = React.createRef()
  const pswdInput = React.createRef()

  return (
    <View style={styles.root}>
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView behavior={'height'} style={styles.content}>

        <Separator height={30}/>

        <MyInput 
          contentType={"username"} 
          hideSymbols={false} 
          onChangeText={setUsername} 
          inputRef={nameInput} 
          styles={styles} 
          text={"Meno"}/>
        <Separator height={10}/>
        <MyInput
          contentType={"password"} 
          hideSymbols={true} 
          onChangeText={setPassword} 
          inputRef={pswdInput}
          styles={styles} 
          text={"Heslo"}/>
        <Separator height={30}/>

        <MyButton onPress={login} text={"Prihlásiť sa"} buttonStyle={styles.button} textStyle={styles.buttonTitle}/>
        <Separator height={10}/>
        <MyButton onPress={navigateRegister} text={"Zaregistrovať sa"} buttonStyle={styles.button} textStyle={styles.buttonTitle}/>
        <Separator height={10}/>
        <MyButton text={"Zabudnuté heslo?"} buttonStyle={styles.button} textStyle={styles.buttonTitle}/>

      </KeyboardAvoidingView>
    </SafeAreaView>
  </View>
  );
}
