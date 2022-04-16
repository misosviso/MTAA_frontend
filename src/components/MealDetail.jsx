import React from 'react';
import { View, Text, Pressable } from 'react-native';

import useStyles from '../styles'
import MyButton from './MyButton';
import Separator from './Separator';


const MealDetail = function ({meal, showReviews, addReview, addFavourites, goBack}) {

  const styles = useStyles()

  return (
    <View>
      <Text style={styles.title}>{meal.name}</Text>
      <Text>{meal.long_desc}</Text>
      <Text>{meal.price + '€'}</Text>
      <Separator height={20}></Separator>
      <MyButton 
        buttonStyle={styles.button} 
        onPress={showReviews}
        text={"Recenzie"}
        textStyle={styles.buttonTitle}
      />
      <Separator height={10}></Separator>
      <MyButton 
        buttonStyle={styles.button} 
        onPress={addReview}
        text={"Pridať recenziu"}
        textStyle={styles.buttonTitle}
      />
      <Separator height={10}></Separator>
      <MyButton 
        buttonStyle={styles.button} 
        onPress={addFavourites}
        text={"Pridať medzi obľúbené"}
        textStyle={styles.buttonTitle}
      />
      <Separator height={10}></Separator>
      <MyButton 
        buttonStyle={styles.button} 
        onPress={goBack}
        text={"Späť do menu"}
        textStyle={styles.buttonTitle}
      />
    </View>
  )
}

export default MealDetail;