import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  Text
} from 'react-native';
// Components
import Separator from '../components/Separator';
import * as SecureStore from 'expo-secure-store';
import Review from '../components/Review';
import ReviewDetail from '../components/ReviewDetail'

const fetchReviews = async function(userToken, setReviews) {
  const URI = 'https://mtaa-apina.herokuapp.com/reviews/'

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
      .then( response => {
        setReviews(response.reviews)
      })
  } catch (error) {
    console.error(error)
  }
}

const fetchMealReviews = async function(userToken, setReviews, mealID) {
  const URI = `https://mtaa-apina.herokuapp.com/reviews/?meal=${mealID}`

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
      .then( response => {
        setReviews(response.reviews)
      })
  } catch (error) {
    console.error(error)
  }
}

const fetchReview = async function(userToken, reviewID) {
  const URI = `https://mtaa-apina.herokuapp.com/reviews/${reviewID}`

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + userToken
    }
  }

  console.log(URI)
  try {
    let response = await fetch(URI, options)
    let data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export default function Reviews({route}) {

  const [userToken, setUserToken] = useState('')
  const [reviews, setReviews] = useState([])
  const [detailReview, setDetailReview] = useState(null)

  const renderItem = ({ item }) => (
    <Pressable onPress={() => {
      fetchReview(userToken, item.id)
        .then(response => {
          setDetailReview(response.review)
        })
      }}>
      <Review review={item}/>
      <Separator height={10}></Separator>
    </Pressable>
  )

  useEffect(() => {
    SecureStore.getItemAsync("userToken")
      .then(token => {
        setUserToken(token)
        if(route?.params?.mealID){
          fetchMealReviews(token, setReviews, route.params.mealID)
        } else {
          fetchReviews(token, setReviews)
        }
      })
  }, [])
  
  
  if(detailReview !== null) {
    return(
      <SafeAreaView>
        <ReviewDetail 
          review={detailReview} 
          showReviews={() => console.log("Go to reviews")}
          addReview={() => console.log("Go to add review")}
          addFavourites={() => addFavourites(userToken, detailReview.id)}
          goBack={() => setDetailReview(null)}/>
      </SafeAreaView>
    )
  } 

  return (
    <SafeAreaView>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )

}