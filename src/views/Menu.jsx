import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text
} from 'react-native';
// Components
import Separator from '../components/Separator';
import * as SecureStore from 'expo-secure-store';
import Meal from '../components/Meal';
import MealDetail from '../components/MealDetail';

import { useNavigation } from '@react-navigation/native';

const fetchMeals = async function(userToken, setMeals) {
  const URI = 'https://mtaa-apina.herokuapp.com/meals/'

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + userToken
    }
  }

  try {
    await fetch(URI, options)
      .then( response => response.json())
      .then( response => setMeals(response.meals))
  } catch (error) {
    console.error(error)
  }
}

const fetchMeal = async function(userToken, mealID) {
  const URI = `https://mtaa-apina.herokuapp.com/meals/${mealID}`

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

const addFavourites = function(userToken, mealID) {
  const URI = `https://mtaa-apina.herokuapp.com/favourites/${mealID}`

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + userToken
    }
  }

  try {
    fetch(URI, options)
  } catch (error) {
    console.error(error)
  }
}

export default function Menu() {

  const [userToken, setUserToken] = useState('')
  const [meals, setMeals] = useState([])
  const [detailMeal, setDetailMeal] = useState(null)

  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <Pressable onPress={() => {
      fetchMeal(userToken, item.id)
        .then(response => {
          setDetailMeal(response.meal[0])
        })
      }}>
      <Meal meal={item}/>
      <Separator height={10}></Separator>
    </Pressable>
  )

  useEffect(() => {
    SecureStore.getItemAsync("userToken")
      .then(token => {
        setUserToken(token)
        fetchMeals(token, setMeals)
      })
  }, [])
  
  
  if(detailMeal !== null) {
    let mealID = detailMeal.id

    return(
      <SafeAreaView>
        <MealDetail 
          meal={detailMeal} 
          showReviews={() => navigation.navigate("Reviews", {mealID: detailMeal.id})}
          addReview={() => navigation.navigate("WriteReview", {mealID: detailMeal.id, meal: detailMeal.name, userToken})}
          addFavourites={() => addFavourites(userToken, detailMeal.id)}
          goBack={() => setDetailMeal(null)}/>
      </SafeAreaView>
    )
  } 

  return (
    <SafeAreaView>
      <FlatList
        data={meals}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )

}