import React, { useEffect, useState } from 'react';
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

export default function Menu() {

  const fetchMeals = async () => {

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + userToken
      }
    }

    fetch('https://mtaa-apina.herokuapp.com/meals/', options)
      .then(res => res.json())
      .then(data => {
          if(data.meals){
            console.log(data)
            setMeals(data.meals);
          } 
      })
      .catch(error => console.log(error))

    console.log(meals)
  }

  const [meals, setMeals] = useState([])
  const [userToken, setUserToken] = useState('')

  useEffect(() => fetchMeals(), [])

  SecureStore.getItemAsync("userToken")
    .then(response => setUserToken(response))

  return (

    <Text>{userToken}</Text>

  )
}