import React from 'react';
import { View } from 'react-native';

const Meal = function ({meal}) {
  return (
    <View>
      <Text>{meal.name}</Text>
      <Text>{meal.short_desc}</Text>
      <Text>{meal.price}</Text>
    </View>
  );
}

export default Meal;