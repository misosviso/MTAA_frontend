import React from 'react';
import { View, Text, Pressable } from 'react-native';

import useStyles from '../styles'
import MyButton from './MyButton';
import Separator from './Separator';


const MealDetail = function ({meal, showReviews, addReview, favourite, favouriteHandler, goBack}) {

  const styles = useStyles()
  let favouriteHandlerTitle;
  if(favourite) {
    favouriteHandlerTitle = "Odstrániť z obľúbených"
  } else {
    favouriteHandlerTitle = "Pridať medzi obľúbené"
  }

  return (
    <View style={{backgroundColor: '#000000'}}>
      <Text style={styles.title}>{meal.name}</Text>
      <Text style={styles.subtitle}>{"Popis jedla: " + meal.long_desc}</Text>
      <Text style={styles.subtitle}>{"Cena: " + meal.price + '€'}</Text>
      <Text style={styles.subtitle}>{'Priemerné hodnotenie: ' + Math.round(meal.avg_rating) + '/10'}</Text>
      <Text style={styles.subtitle}>{'Počet hodnotení: ' + meal.reviews_count}</Text>
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
        onPress={favouriteHandler}
        text={favouriteHandlerTitle}
        textStyle={styles.buttonTitle}
      />
      <Separator height={10}></Separator>
      <MyButton 
        buttonStyle={styles.button} 
        onPress={goBack}
        text={"Späť do menu"}
        textStyle={styles.buttonTitle}
      />
       <Separator height={600}></Separator>
    </View>
  )
}

export default MealDetail;