import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import {AsyncStorage} from "react-native";

import * as SecureStore from 'expo-secure-store'

import Login from './src/views/Login'
import Register from './src/views/Register'
import Home from './src/views/Home'
import Menu from './src/views/Menu'
import Reviews from './src/views/Reviews'
import WriteReview from './src/views/WriteReview'
import ChangePassword from "./src/views/ChangePassword";
import ResetPassword from "./src/views/ResetPassword";
import EditReview from './src/views/EditReview'


const Stack = createStackNavigator()

export default function App(){

  const [userToken, setUserToken] = useState(null);

  SecureStore.getItemAsync('userToken')
    .then((token) => {
      setUserToken(token)
      AsyncStorage.setItem('userToken', token)
    })

  console.log(userToken)

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Reviews" component={Reviews} />
          <Stack.Screen name="WriteReview" component={WriteReview} />
          <Stack.Screen name="EditReview" component={EditReview} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
