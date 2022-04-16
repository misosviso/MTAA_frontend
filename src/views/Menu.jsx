import React, { useRef, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
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
import Meal from '../components/Meal';

const getData = async function(userToken) {
  const URI = 'https://mtaa-apina.herokuapp.com/meals/'

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + userToken
    }
  }

  try {
    let response = await fetch(URI, options)
    let data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export default function Menu() {

  // const [meals, setMeals] = useState([])

  let meals;

  SecureStore.getItemAsync("userToken")
    .then(userToken => getData(userToken))
    .then(mealsData => {
      console.log(mealsData)
      meals = mealsData;
    })

  return (
    <FlatList
      data={meals}
      keyExtractor={meal => meal.id.toString()}
      renderItem={meal => <Meal meal={meal}></Meal>}/>
  )
}