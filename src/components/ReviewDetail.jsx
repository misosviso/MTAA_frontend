import React from 'react';
import { View, Text, Pressable } from 'react-native';

import useStyles from '../styles'
import MyButton from './MyButton';
import Separator from './Separator';


const ReviewDetail = function ({review, goBack}) {

  const styles = useStyles()

  return (
    <View>
      <Text style={styles.title}>{review.author}</Text>
      <Text>{"Hodnotenie: " + review.rating + "/10"}</Text>
      <Text>{review.text}</Text>
    </View>
  )
}

export default ReviewDetail;