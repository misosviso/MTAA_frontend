import React, { useState } from 'react';
import NetInfo from "@react-native-community/netinfo";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Slider } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
// Components
import Separator from '../components/Separator';
import MyButton from '../components/MyButton';
import * as SecureStore from 'expo-secure-store';
import useStyles from '../styles';
import MyTextInput from '../components/MyTextInput';



export default function EditReview({route}){

  const styles = useStyles()
  const [text, setText] = useState('')
  const [rating, setRating] = useState(route.params.review.rating)
  const [photo, setPhoto] = useState(null)
  const textInput = React.createRef()
  const ratingInput = React.createRef()

  const navigation = useNavigation()

  function navigateReviews(){
    navigation.navigate("Home")
  }

  async function handleReviewOfflineEdit() {
      const URI = `https://mtaa-apina.herokuapp.com/reviews/${route.params.review.id}`

      const review = {
          rating: rating.toString(),
          text: text,
          meal: route.params.review.meal_id.toString(),
      }

      const options = {
          method: 'PUT',
          body: JSON.stringify(review),
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + route.params.userToken
          }
      }

      await NetInfo.fetch().then(async (state) => {
          if (state.isInternetReachable) {
              fetch(URI, options)
                  .then(response => {
                      if (response.status == 200) {
                          Alert.alert("Recenzia bola úspešne zmenená")
                          navigateReviews()
                      }
                  })
          }
      })
  }

  async function putReview() {

    const URI = `https://mtaa-apina.herokuapp.com/reviews/${route.params.review.id}`

    const review = {
        rating: rating.toString(),
        text: text,
        meal: route.params.review.meal_id.toString(),
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(review),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + route.params.userToken
        }
    }

    await NetInfo.fetch().then(async (state) => {
        if (state.isInternetReachable) {
            fetch(URI, options)
                .then(response => {
                    if(response.status == 200) {
                        Alert.alert("Recenzia bola úspešne zmenená")
                        navigateReviews()
                    }
                })
        } else {
            Alert.alert("Recenzia bude zmenená po pripojení k internetu")
            NetInfo.addEventListener(() => handleReviewOfflineEdit())
            navigateReviews()
            }
        })
  }

  console.log(route.params)

  return(
    <View style={styles.root}>
      <Text style={styles.title}>{route.params.review.meal_name}</Text>
      <Separator height={20}></Separator>
        <MyTextInput
          text={route.params.review.text}
          styles={styles}
          onChangeText={setText}
          inputRef={textInput}/>
        <Separator height={20} />
        <Text style={styles.subtitle}>{"Vaše hodnotenie: " + rating + "/10"}</Text>
        <Separator height={10} />
        <Slider
          value={route.params.review.rating}
          ref={ratingInput}
          minimumValue={0}
          maximumValue={10}
          step={1}
          onValueChange={(value) => setRating(value)}/>
        <Separator height={30} />
        <Separator height={10} />
        <MyButton
          buttonStyle={styles.button}
          onPress={putReview}
          text={"Upraviť recenziu"}
          textStyle={styles.buttonTitle}/>

    </View>

    )

}
