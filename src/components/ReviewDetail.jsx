import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import useStyles from '../styles'
import MyButton from './MyButton';
import Separator from './Separator';


const ReviewDetail = function ({review, userToken, myReview, goBack, editReview}) {

  const styles = useStyles()

  return (
    <View>
      <Text style={styles.title}>{review.author}</Text>
      <Text>{"Hodnotenie: " + review.rating + "/10"}</Text>
      <Text>{review.text}</Text>
      <Separator height={20}></Separator>
      { review.photo !== null && 
      (<Image source={{
        uri: `https://mtaa-apina.herokuapp.com/files/${review.photo}`,
        method: "GET",
        headers: {
          "Authorization": "Token " + userToken
          }
        }
      }
      style={{ alignSelf: 'center', width: 250, height: 250}}>
      </Image>)}
      { myReview && (
      <MyButton buttonStyle={styles.button} textStyle={styles.buttonTitle} text={"Upraviť recenziu"} onPress={editReview}>
      </MyButton>)}
      <Separator height={10}/>
      <MyButton buttonStyle={styles.button} textStyle={styles.buttonTitle} text={"Späť na recenzie"} onPress={goBack}></MyButton>
    </View>
  )
}

export default ReviewDetail;