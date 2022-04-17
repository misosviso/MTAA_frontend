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
import { Slider } from 'react-native'
import { useNavigation } from '@react-navigation/native';
// Components
import Separator from '../components/Separator';
import MyButton from '../components/MyButton';
import * as SecureStore from 'expo-secure-store';
import useStyles from '../styles';
import MyTextInput from '../components/MyTextInput';

export default function WriteReview({route}){

  const styles = useStyles()
  const [text, setText] = useState('')
  const [rating, setRating] = useState(1)
  const textInput = React.createRef()
  const ratingInput = React.createRef()

  function navigateHome(){
      useNavigation().navigate("Home")
  }

  function postReview(){

    const review = {
      rating: rating,
      text: text,
      meal: route.params.mealID
    }

    console.log(review)
    console.log({'Authorization': 'Token ' + route.params.userToken})

    const options = {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + route.params.userToken
      }
    }

    fetch('https://mtaa-apina.herokuapp.com/review/', options)
      .then(() => navigateHome())
      .catch(error => console.log(error))
  }


  return(
    <View>
      <Text style={styles.title}>{route.params.meal}</Text>
        <MyTextInput
          text={"Sem môžete napísať svoju recenziu"}
          styles={styles}
          onChangeText={setText} 
          inputRef={textInput}/>
        <Separator height={20} />
        <Text>{"Vaše hodnotenie: " + rating + "/10"}</Text>
        <Separator height={10} />
        <Slider 
          ref={ratingInput}
          minimumValue={0}
          maximumValue={10}
          step={1}
          onValueChange={(value) => setRating(value)}/>
        <Separator height={30} />
        <MyButton 
          buttonStyle={styles.button}
          onPress={() => console.log("submiting review")}
          text={"Nahrať fotku"}
          textStyle={styles.buttonTitle}/>
        <Separator height={10} />
        <MyButton 
          buttonStyle={styles.button}
          onPress={postReview}
          text={"Uverejniť recenziu"}
          textStyle={styles.buttonTitle}/>

    </View>

    )

}