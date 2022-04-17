import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
// Components
import Separator from '../components/Separator';
import * as SecureStore from 'expo-secure-store';
import Meal from '../components/Meal';
import MealDetail from '../components/MealDetail';

import { useNavigation } from '@react-navigation/native';
import MyButton from '../components/MyButton';


const fetchMeals = async function(userToken, setMeals, orderBy='name', orderType='asc') {
  const URI = `https://mtaa-apina.herokuapp.com/meals/?orderBy=${orderBy}&orderType=${orderType}`

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

const fetchFavourites = async function(userToken, setFavourites) {
  const URI = 'https://mtaa-apina.herokuapp.com/favourites/'

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
      .then( response => setFavourites(response.meals))
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

const addFavourite = function(userToken, mealID, goBack, setFavourites) {
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
      .then(response => {
        if(response.status == 201) {
          Alert.alert("Jedlo bolo pridané medzi obľúbené")
          fetchFavourites(userToken, setFavourites)
          goBack()
        }
      })
  } catch (error) {
    console.error(error)
  }
}

const deleteFavourite = function(userToken, mealID, goBack, setFavourites) {
  const URI = `https://mtaa-apina.herokuapp.com/favourites/${mealID}`

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
          Alert.alert("Jedlo bolo odstránené z obľúbených")
          fetchFavourites(userToken, setFavourites)
          goBack()
        }
      })
  } catch (error) {
    console.error(error)
  }
}

export default function Menu() {

  const [userToken, setUserToken] = useState('')
  const [meals, setMeals] = useState([])
  const [showFavourites, setShowFavourites] = useState(false)
  const [favourites, setFavourites] = useState([])
  const [detail, setDetail] = useState(null)
  const [modal, setModal] = useState(false)

  const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <Pressable onPress={() => {
      fetchMeal(userToken, item.id)
        .then(response => {
          setDetail(response.meal[0])
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
        fetchFavourites(token, setFavourites)
      })
  }, [])
  
  if(detail !== null) {
    
    let favourite = false;
    favourites.forEach(f => {
      if(f.id == detail.id) {
        favourite = true;
      }
    })

    let favouriteHandler;
    if(favourite) {
      favouriteHandler = deleteFavourite;
    } else {
      favouriteHandler = addFavourite;
    }

    return(
      <SafeAreaView>
        <MealDetail 
          meal={detail} 
          showReviews={() => navigation.navigate("Reviews", {mealID: detail.id})}
          addReview={() => navigation.navigate("WriteReview", {mealID: detail.id, meal: detail.name, userToken})}
          favourite={favourite}
          favouriteHandler={() => favouriteHandler(userToken, detail.id, () => setDetail(null), setFavourites)}
          goBack={() => setDetail(null)}/>
      </SafeAreaView>
    )
  } 

  function sort(orderBy, orderType) {
    fetchMeals(userToken, setMeals, orderBy, orderType)
    setModal(false)
  }

  return (
    <SafeAreaView>
      {/* SORT */}
      <TouchableOpacity onPress={() => setModal(true)} style={{alignSelf: 'flex-end'}}>
        <Icon name="sort"></Icon>
      </TouchableOpacity>
      <Modal isVisible={modal}>
        <View style={{
          alignSelf:'center',
          justifyContent: "center",
          paddingHorizontal: 15,
          minHeight: 100,
        }}>
          <Text>Zoradiť podľa: </Text>
          <Separator height={20}></Separator>

          <TouchableOpacity onPress={() => sort('name', 'asc')}><Text>Podľa mena vzostupne</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => sort('name', 'desc')}><Text>Podľa mena zostupne</Text></TouchableOpacity>
          
          <TouchableOpacity onPress={() => sort('short_desc', 'asc')}><Text>Podľa popisu vzostupne</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => sort('short_desc', 'desc')}><Text>Podľa popisu zostupne</Text></TouchableOpacity>
          
          <TouchableOpacity onPress={() => sort('avg_rating', 'asc')}><Text>Podľa hodnotenia vzostupne</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => sort('avg_rating', 'desc')}><Text>Podľa hodnotenia zostupne</Text></TouchableOpacity>

          <TouchableOpacity onPress={() => sort('reviews_count', 'asc')}><Text>Podľa ceny vzostupne</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => sort('reviews_count', 'desc')}><Text>Podľa ceny zostupne</Text></TouchableOpacity>
          
          <TouchableOpacity onPress={() => sort('price', 'asc')}><Text >Podľa počtu hodnotení vzostupne</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => sort('price', 'desc')}><Text >Podľa počtu hodnotení zostupne</Text></TouchableOpacity>
          
          <Separator height={50}></Separator>
          <TouchableOpacity onPress={() => setModal(false)}>
            <Text>Zavrieť</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* FILTER */}
      <TouchableOpacity onPress={() => { 
          if(showFavourites) {
            fetchFavourites(userToken, setMeals)
          } else {
            fetchMeals(userToken, setMeals)
          }
          setShowFavourites(!showFavourites) 
        }} style={{alignSelf: 'flex-end'}}>
        <Icon name="star"></Icon>
      </TouchableOpacity>
      
      {/* MEALS */}
      <FlatList
        data={meals}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )

}