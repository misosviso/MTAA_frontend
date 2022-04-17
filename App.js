import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"

import * as SecureStore from 'expo-secure-store'

import Login from './src/views/Login'
import Register from './src/views/Register'
import Home from './src/views/Home'
import Menu from './src/views/Menu'
import Reviews from './src/views/Reviews'
import WriteReview from './src/views/WriteReview'

const Stack = createStackNavigator()

export default function App(){

  const [userToken, setUserToken] = useState(null);

  SecureStore.getItemAsync('userToken')
    .then((token) => {
      setUserToken(token)
    })

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Reviews" component={Reviews} />
          <Stack.Screen name="WriteReview" component={WriteReview} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}