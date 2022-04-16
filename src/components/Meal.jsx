import React from 'react';
import { View, Text, Pressable } from 'react-native';

import useStyles from '../styles'
import MyButton from './MyButton';
import Separator from './Separator';


const Meal = function ({meal}) {

  const styles = useStyles()

  return (
    <View style={styles.listItem}>
        <Text>{meal.name}</Text>
        <Text>{meal.short_desc}</Text>
        <Text>{meal.price + '€'}</Text>
    </View>
  );
}

export default Meal;