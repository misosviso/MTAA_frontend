import React from 'react';
import { View, Text, Pressable } from 'react-native';

import useStyles from '../styles'

const Review = function ({review}) {

  const styles = useStyles()

  return (
    <View style={styles.listItem}>
        <Text>{"Autor: " + review.author}</Text>
        <Text>{review.text.substring(0, 30) + "..."}</Text>
        <Text>{review.rating + "/10"}</Text>
    </View>
  );
}

export default Review;