import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView, SafeAreaViewComponent,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Components
import Separator from '../components/Separator';
import MyButton from '../components/MyButton';
import useStyles from '../styles';
import MyInput from '../components/MyInput';

export default function ResetPassword() {
    const [email, setEmail] = useState('');

    const navigation = useNavigation();
    const styles = useStyles();

    function navigateToChange() {
        navigation.navigate('ChangePassword');
    }

    function reset() {
        emailInput.current.clear();

        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
            }),
        };

        fetch('https://mtaa-apina.herokuapp.com/reset/', options)
            .then(res =>{
                console.log(res);
                res.json();
            })
            .then(data=> {
                if (data.detail === "Email with password reset token has been sent") {
                    Alert.alert('Success', data.detail);
                    navigateToChange();
                    return;
                } else {
                    Alert.alert('Error', data.detail);
                }
                emailInput.current.clear();
            })
            .catch(error => console.log(error));
    }

    const emailInput = React.createRef();

    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.safeAreaView}>
                <KeyboardAvoidingView behavior={'height'} style={styles.content}>
                    <Text style={styles.title}>Reset Password</Text>
                    <Separator height={30}/>

                    <MyInput
                        contentType={"username"}
                        hideSymbols={false}
                        onChangeText={setEmail}
                        inputRef={emailInput}
                        styles={styles}
                        text={"E-mail"}/>

                    <Separator height={30}/>

                    <MyButton onPress={reset} text={"Poslat"} buttonStyle={styles.button} textStyle={styles.buttonTitle}/>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}
