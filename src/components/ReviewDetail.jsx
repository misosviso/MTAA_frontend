import React, { useState } from 'react';
import { View, Text, Pressable, Image, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

import useStyles from '../styles'
import MyButton from './MyButton';
import Separator from './Separator';


const ReviewDetail = function ({review, userToken, myReview, goBack, editReview, deleteReview}) {

  const styles = useStyles()
  console.log(review.photo)

  return (
      <SafeAreaView>
        <Text style={styles.title}>{review.author}</Text>
        <Text style={styles.subtitle}>{"Hodnotené jedlo: " + review.meal_name}</Text>
        <Text style={styles.subtitle}>{"Hodnotenie: " + review.rating + "/10"}</Text>
        <Text style={styles.subtitle}>{"Text recenzie: " + review.text}</Text>
        <Separator height={20}></Separator>
        { review.photo !== null && 
        (<Image source={{
          uri: `https://mtaa-apina.herokuapp.com/files/${review.photo}`,
          method: "GET",
          headers: {
            "Content-type": "image/jpg",
            "Authorization": "Token " + userToken
            }
          }
        }
        onLoad={() => console.log("Load")}
        onLoadStart={() => console.log("load start")}
        onLoadEnd={() => console.log("load end")}
        onError={(error) => console.log('error')}
        onProgress={() => console.log("progress")}
        style={{ alignSelf: 'center', width: 300, height: 300}}>
        </Image>)}
        { myReview && (
        <MyButton buttonStyle={styles.button} textStyle={styles.buttonTitle} text={"Upraviť recenziu"} onPress={editReview}>
        </MyButton>)}
        <Separator height={10}/>
        { myReview && (
        <MyButton buttonStyle={styles.button} textStyle={styles.buttonTitle} text={"Vymazať recenziu"} onPress={deleteReview}>
        </MyButton>)}
        <Separator height={10}/>
        <MyButton buttonStyle={styles.button} textStyle={styles.buttonTitle} text={"Späť na recenzie"} onPress={goBack}></MyButton>
        <Separator height={600}/>
      </SafeAreaView>
  )
}

export default ReviewDetail;