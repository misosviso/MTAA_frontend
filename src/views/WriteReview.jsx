import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Slider } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
// Components
import Separator from '../components/Separator';
import MyButton from '../components/MyButton';
import * as SecureStore from 'expo-secure-store';
import useStyles from '../styles';
import MyTextInput from '../components/MyTextInput';



export default function WriteReview({route}){

  const styles = useStyles()
  const [text, setText] = useState('')
  const [rating, setRating] = useState(1)
  const [photo, setPhoto] = useState(null)
  const [fileID, setFileID] = useState(null)
  const textInput = React.createRef()
  const ratingInput = React.createRef()
 
  const navigation = useNavigation()

  function navigateMenu(){
    navigation.navigate("Menu")
  }

  async function postPhotoReview() {
    const URI = 'https://mtaa-apina.herokuapp.com/files/'  

    const formData = new FormData()
    formData.append('file', {uri: photo, type: 'image/jpg', name: 'image.jpg'})
    formData.append('name', String("Recenzia.jpg"));

    const request = new XMLHttpRequest()

    let file;

    request.open("POST", URI, true);
    request.setRequestHeader('Authorization', 'Token ' + route.params.userToken)
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 201) {
        console.log(request.responseText);
        file = JSON.parse(request.responseText).id
        postReview(file)
      }
    }
    request.send(formData);

    console.log(request.responseText)
    return file
  };
    
  async function postReview(file=null) {

    const URI = 'https://mtaa-apina.herokuapp.com/reviews/'
    
    const review = {
      rating: rating.toString(),
      text: text,
      meal: route.params.mealID.toString(),
      photo: file
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + route.params.userToken
        }
    }

    fetch(URI, options)
      .then(response => {
        if(response.status == 201) {
          Alert.alert("Recenzia bola úspešne pridaná")
          navigateMenu()
        }
      })
  }

  async function pickImage() {
    let chosenImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(chosenImage);

    if (!chosenImage.cancelled) {
      setPhoto(chosenImage.uri)
    }
  }

  return(
    <View style={styles.root}>
      <Text style={styles.title}>{route.params.meal}</Text>
        <Separator height={20}></Separator>
        <MyTextInput
          text={"Sem môžete napísať svoju recenziu"}
          styles={styles}
          onChangeText={setText} 
          inputRef={textInput}/>
        <Separator height={20} />
        <Text style={styles.subtitle}>{"Vaše hodnotenie: " + rating + "/10"}</Text>
        <Separator height={10} />
        <Slider 
          ref={ratingInput}
          minimumValue={0}
          maximumValue={10}
          step={1}
          onValueChange={(value) => setRating(value)}/>
        <Separator height={30} />
        <MyButton 
          buttonStyle={styles.button}
          onPress={pickImage}
          text={"Nahrať fotku"}
          textStyle={styles.buttonTitle}/>
        <Separator height={10} />
        <MyButton 
          buttonStyle={styles.button}
          onPress={() => {
            if(photo) {
              postPhotoReview()
            } else {
              postReview()
            }
          }}
          text={"Uverejniť recenziu"}
          textStyle={styles.buttonTitle}/>

    </View>

    )

}