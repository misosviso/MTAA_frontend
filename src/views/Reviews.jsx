import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity
} from 'react-native';
// Components
import { useNavigation } from '@react-navigation/native';
import Separator from '../components/Separator';
import * as SecureStore from 'expo-secure-store';
import Review from '../components/Review';
import ReviewDetail from '../components/ReviewDetail'
import { Icon } from 'react-native-elements';

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

const fetchMyReviews = async function(userToken, setReviews) {
  const URI = 'https://mtaa-apina.herokuapp.com/reviews/?myReviews=true'

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

const fetchReview = async function(userToken, reviewID, setDetail) {
  const URI = `https://mtaa-apina.herokuapp.com/reviews/${reviewID}`

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
    setDetail(data.review)
    return data
  } catch (error) {
    console.error(error)
  }
}

export default function Reviews({route}) {

  const [userToken, setUserToken] = useState('')
  const [reviews, setReviews] = useState([])
  const [myReviews, setMyReviews] = useState([])
  const [detailReview, setDetailReview] = useState(null)
  const [showMy, setShowMy] = useState(false)

  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <Pressable onPress={() => {
      fetchReview(userToken, item.id, setDetailReview)
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
          fetchMyReviews(token, setMyReviews)
        }
      })
  }, [])
  
  
  if(detailReview !== null) {
    let myReview = false;

    myReviews.forEach(review => {
      if(review.id == detailReview.id) {
        myReview = true;
      }
    })

    return(
      <SafeAreaView>
        <ReviewDetail 
          myReview={myReview}
          editReview={() => navigation.navigate("EditReview", {userToken, review: detailReview})}
          review={detailReview} 
          goBack={() => setDetailReview(null)}
          userToken={userToken}/>
      </SafeAreaView>
    )
  } 

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => {
          if(!showMy) {
            fetchMyReviews(userToken, setReviews)
          } else {
            fetchReviews(userToken, setReviews)
          }
          setShowMy(!showMy)
        }} style={{alignSelf: 'flex-end'}}>
        <Icon name="person"></Icon>
      </TouchableOpacity>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )

}