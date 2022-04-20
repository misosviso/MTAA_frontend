import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Components
import Separator from '../components/Separator';
import MyButton from '../components/MyButton';
import MyInput from '../components/MyInput';

// Style
import useStyles from '../styles';

export default function Register() {

  const styles = useStyles();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [email, setEmail] = useState('')

  const navigation = useNavigation()

  function navigateLogin() {
    navigation.navigate("Login")
  }

  function emailValid(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
  }

  function register(){

    if (!username) {
      Alert.alert("Registrácia zlyhala", "Zadajte prosím používateľské meno")
      return
    }

    if (!password) {
      Alert.alert("Registrácia zlyhala", "Zadajte prosím heslo")
      return
    }

    if (!confPassword) {
        Alert.alert("Registrácia zlyhala", "Vyžaduje sa potvrdenie hesla")
        return
    }

    if (!email) {
        Alert.alert("Registrácia zlyhala", "Zadajte prosím email")
        return
    }

    if (password != confPassword) {
        Alert.alert("Registrácia zlyhala", "Heslá sa nezhodujú")
        return
    }

    if (!emailValid(email)){
        Alert.alert("Registrácia zlyhala", "Zadajte prosím platný email")
        return
    }


    const user = {
      username: username,
      password: password,
      email: email
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('https://mtaa-apina.herokuapp.com/register/', options)
      .then(res => res.json())
      .then(data => {
          if(data.userID) {
            Alert.alert("Registrácia úspešná", "Teraz sa môžete prihlásiť")
            navigateLogin()
          } else {
            Alert.alert("Používateľ už existuje")
          }
          nameInput.current.clear()
          pswdInput.current.clear()
          pswdConfirmInput.current.clear()
          emailInput.current.clear()
      })
      .catch(error => console.log(error))
  }

  const nameInput = React.createRef()
  const pswdInput = React.createRef()
  const pswdConfirmInput = React.createRef()
  const emailInput = React.createRef()

  return (
    <View style={styles.root}>
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView behavior={'height'} style={styles.content}>

        <Separator height={30}/>

        {/* Name */}
        <MyInput
          contentType={"username"}
          hideSymbols={false}
          onChangeText={setUsername}
          inputRef={nameInput}
          styles={styles}
          text={"Meno"}/>
        <Separator height={10}/>
        {/* Password */}
        <MyInput
          contentType={"password"}
          hideSymbols={true}
          onChangeText={setPassword}
          inputRef={pswdInput}
          styles={styles}
          text={"Heslo"}/>
        <Separator height={10}/>
        {/* Confirm password */}
        <MyInput
          contentType={"password"}
          hideSymbols={true}
          onChangeText={setConfPassword}
          inputRef={pswdConfirmInput}
          styles={styles}
          text={"Potvrdenie hesla"}/>
        <Separator height={10}/>
        {/* Email */}
        <MyInput
          contentType={"username"}
          hideSymbols={false}
          onChangeText={setEmail}
          inputRef={emailInput}
          styles={styles}
          text={"E-mail"}/>

        <Separator height={30}/>

        <MyButton onPress={register} text={"Zaregistrovať sa"} buttonStyle={styles.button} textStyle={styles.buttonTitle}/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </View>
  );
}
