import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// Components
import { useNavigation } from '@react-navigation/native';
import Separator from '../components/Separator';
import * as SecureStore from 'expo-secure-store';
import Review from '../components/Review';
import ReviewDetail from '../components/ReviewDetail'
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import useStyles from '../styles';
import MyButton from '../components/MyButton';

const fetchReviews = async function(userToken, setReviews, orderBy='rating', orderType='desc') {

  let URI = `https://mtaa-apina.herokuapp.com/reviews/?orderBy=${orderBy}&orderType=${orderType}`

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

const deleteReview = async function(userToken, reviewID, setReviews, goBack) {
  const URI = `https://mtaa-apina.herokuapp.com/reviews/${reviewID}`

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + userToken
    }
  }

  try {
    fetch(URI, options)
      .then(response => {
        console.log(response.status)
        if(response.status == 200) {
          Alert.alert("Recenzia bola odstránená")
          fetchReviews(userToken, setReviews)
          goBack()
        }
      })
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
  const [modal, setModal] = useState(false)

  const navigation = useNavigation()
  const styles = useStyles()

  function goBack() {
    setDetailReview(null)
  }

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
      <View style={{backgroundColor: '#000000'}}>
        <SafeAreaView >
          <ReviewDetail 
            myReview={myReview}
            editReview={() => navigation.navigate("EditReview", {userToken, review: detailReview})}
            deleteReview={() => deleteReview(userToken, detailReview.id, setReviews, goBack)}
            review={detailReview} 
            goBack={() => setDetailReview(null)}
            userToken={userToken}/>
        </SafeAreaView>
      </View>
    )
  } 

  function sort(orderBy, orderType) {
    setShowMy(false)
    fetchReviews(userToken, setReviews, orderBy, orderType, showMy)
    setModal(false)
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* SORT */}
      <TouchableOpacity onPress={() => setModal(true)} style={{alignSelf: 'flex-end'}}>
        <Icon backgroundColor={'rgb(128, 128, 128)'} name="sort"></Icon>
      </TouchableOpacity>
      <Modal isVisible={modal}>
        <View style={{
          alignSelf:'center',
          justifyContent: "center",
          paddingHorizontal: 15,
          minHeight: 100,
        }}>
          <Text style={styles.subtitle}>Zoradiť podľa: </Text>
          <Separator height={20}></Separator>

          <TouchableOpacity onPress={() => sort('rating', 'asc')}><Text style={styles.subtitle}>Podľa hodontenia vzostupne</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => sort('rating', 'desc')}><Text style={styles.subtitle}>Podľa hodnotenia zostupne</Text></TouchableOpacity>
          
          <TouchableOpacity onPress={() => sort('created_at', 'asc')}><Text style={styles.subtitle}>Od najstarších</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => sort('created_at', 'desc')}><Text style={styles.subtitle}>Od najnovších</Text></TouchableOpacity>
          
          <Separator height={50}></Separator>
          <MyButton
            buttonStyle={styles.button}
            onPress={() => setModal(false)}
            text={"Zavrieť"}
            textStyle={styles.buttonTitle}> 
          </MyButton>
        </View>
      </Modal>

      {/* FILTER */}
      <TouchableOpacity onPress={() => {
          if(!showMy) {
            fetchMyReviews(userToken, setReviews)
          } else {
            fetchReviews(userToken, setReviews)
          }
          setShowMy(!showMy)
        }} style={{alignSelf: 'flex-end'}}>
        { showMy && (<Icon color={'rgb(93, 95, 222)'} backgroundColor={'rgb(128, 128, 128)'} name="person"></Icon>)}
        { !showMy && (<Icon backgroundColor={'rgb(128, 128, 128)'} name="person"></Icon>)}
      </TouchableOpacity>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )

}