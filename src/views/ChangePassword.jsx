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
import * as SecureStore from 'expo-secure-store';
import useStyles from '../styles';
import MyInput from '../components/MyInput';

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [token, setToken] = useState('');

    SecureStore.getItemAsync('userToken')
        .then((token) => {
            setToken(token)
        })

    const navigation = useNavigation();
    const styles = useStyles();

    function navigateHome() {
        navigation.navigate('Home');
    }

    function change() {
        passwordInput.current.clear();
        confPasswordInput.current.clear();

        if (!password) {
            Alert.alert('Error', 'Please enter a password');
            return;
        }

        if (!confPassword) {
            Alert.alert('Error', 'Please confirm your password');
            return;
        }

        if (password !== confPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        const options = {
            method: 'PUT',
            body: JSON.stringify({
                "password": password,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
        }

        fetch('https://mtaa-apina.herokuapp.com/reset/', options)
            .then(res => res.json())
            .then(data => {
                if (data.detail === "Password changed successfully") {
                    Alert.alert('Success', 'Password changed successfully');
                    navigateHome();
                } else {
                    Alert.alert('Error', data.detail);
                }
                passwordInput.current.clear();
                confPasswordInput.current.clear();
            })
            .catch(error => console.log(error));

    }

    const passwordInput = React.createRef();
    const confPasswordInput = React.createRef();

    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.safeAreaView}>
                <KeyboardAvoidingView behavior={'height'} style={styles.content}>
                    <Text style={styles.title}>Change Password</Text>
                    <Separator height={30}/>

                    {/* Password */}
                    <MyInput
                        contentType={"password"}
                        hideSymbols={true}
                        onChangeText={setPassword}
                        inputRef={passwordInput}
                        styles={styles}
                        text={"Heslo"}/>
                    <Separator height={10}/>
                    {/* Confirm password */}
                    <MyInput
                        contentType={"password"}
                        hideSymbols={true}
                        onChangeText={setConfPassword}
                        inputRef={confPasswordInput}
                        styles={styles}
                        text={"Potvrdenie hesla"}/>

                    <Separator height={30}/>

                    <MyButton onPress={change} text={"Zmenit heslo"} buttonStyle={styles.button} textStyle={styles.buttonTitle}/>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}
