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

  const renderItem = ({ item }) => (
    <Pressable onPress={() => {
      fetchMeal(userToken, item.id)
        .then(response => {
          console.log(item.id)
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
        console.log("token: " + token)
        setUserToken(token)
        fetchMeals(token, setMeals)
      })
  }, [])
  
  
  if(detailMeal !== null) {
    return(
      <SafeAreaView>
        <MealDetail 
          meal={detailMeal} 
          showReviews={() => console.log("Go to reviews")}
          addReview={() => console.log("Go to add review")}
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