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
  const textInput = React.createRef()
  const ratingInput = React.createRef()
 
  const navigation = useNavigation()

  function navigateMenu(){
    navigation.navigate("Menu")
  }

  async function postPhoto() {
    const URI = 'https://mtaa-apina.herokuapp.com/files/'
    

    let blobPhoto = await fetch(URI)
      .then(res => res.blob())

    const photoData = {
      uri: photo,
    }

    const formData = new FormData()
    formData.append("image", blobPhoto)

    const body = {
      file: formData,
      name: "abcd.jpg"
    }

    console.log(JSON.stringify(formData))

    const options = {
        method: 'POST',
        body: body,
        headers: {
          'Authorization': 'Token ' + route.params.userToken
        }
    }

    fetch(URI, options)
      .then(response => response.json())
      .then(response => console.log(response))
  }

  async function postReview() {

    const URI = 'https://mtaa-apina.herokuapp.com/reviews/'
    let photoID = null;

    if (photo) {
      photoID = postPhoto()
    }

    const review = {
        rating: rating.toString(),
        text: text,
        meal: route.params.mealID.toString(),
        photo: photo
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
    <View>
      <Text style={styles.title}>{route.params.meal}</Text>
        <MyTextInput
          text={"Sem môžete napísať svoju recenziu"}
          styles={styles}
          onChangeText={setText} 
          inputRef={textInput}/>
        <Separator height={20} />
        <Text>{"Vaše hodnotenie: " + rating + "/10"}</Text>
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
          onPress={postReview}
          text={"Uverejniť recenziu"}
          textStyle={styles.buttonTitle}/>

    </View>

    )

}