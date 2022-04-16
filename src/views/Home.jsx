
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
// Components
import Separator from '../components/Separator';
import MyButton from '../components/MyButton';
import * as SecureStore from 'expo-secure-store';
import useStyles from '../styles';
// Modules


export default function Home({navigation}) {
  const styles = useStyles();

  function menu() {
    navigation.navigate("Menu") 
  }

  function reviews() {
    navigation.navigate("Reviews")
  }

  function videoCall() {

  }

  function changePassword() {

  }

  function logout() {

    SecureStore.getItemAsync('userToken')
      .then((token) => {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
          }
        }
        
        fetch('https://mtaa-apina.herokuapp.com/logout/', options)
          .then(() => {
            SecureStore.deleteItemAsync("userToken")
            navigation.navigate("Login") 
          })
          .catch(error => console.log(error))
      })
  }

  return(
    <View>
      <Text>Detaily</Text>
      <Separator height={20}/>
      <MyButton onPress={menu} text={"Jedálny lístok"} buttonStyle={styles.button} textStyle={styles.buttonTitle}></MyButton>
      <Separator height={10}/>
      <MyButton onPress={reviews} text={"Recenzie"} buttonStyle={styles.button} textStyle={styles.buttonTitle}></MyButton>
      <Separator height={10}/>
      <MyButton text={"Uskutočniť videohovor"} buttonStyle={styles.button} textStyle={styles.buttonTitle}></MyButton>
      <Separator height={10}/>
      <MyButton text={"Zmena heslo"} buttonStyle={styles.button} textStyle={styles.buttonTitle}></MyButton>
      <Separator height={10}/>
      <MyButton onPress={logout} text={"Odhlásiť sa"} buttonStyle={styles.button} textStyle={styles.buttonTitle}/>
    </View>
  )

}