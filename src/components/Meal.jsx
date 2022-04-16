import React from 'react';
import { View, Text, Pressable } from 'react-native';

import useStyles from '../styles'


const Meal = function ({meal}) {

  const styles = useStyles()
  
  let rating;
  if(meal.avg_rating != 0) {
    rating = 'Priemerné hodnotenie: ' + meal.avg_rating + '/10'
  } else {
    rating = 'Jedlo ešte nebolo ohodnotené'
  }

  return (
    <View style={styles.listItem}>
        <Text>{meal.name}</Text>
        <Text>{meal.short_desc}</Text>
        <Text>{meal.price + '€'}</Text>
        <Text>{rating}</Text>
    </View>
  );
}

export default Meal;