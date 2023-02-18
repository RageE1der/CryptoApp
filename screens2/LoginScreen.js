import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { auth } from '../firebase';
import FormInput from '../components2/FormInput';
import FormButton from '../components2/FormButton';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { COLORS } from '../constants';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified == false) {
          alert({text: 'Email Not Verified',position: 'bottom', buttonText: 'Try Again' });
        } else {
        navigation.navigate("Tab")
        }
      } else {
        
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        navigation.replace("Tab");
      })
      .catch(error => alert(error.message))
  }

  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary}}>
    <Image
      source={require('../assets/logo.png')} 
      style={styles.logo}
    />
    <Text style={styles.text}>Crypto</Text>
    <FormInput
    labelValue={email}
    onChangeText={(userEmail) => setEmail(userEmail)}
    placeholderText="Email"
    iconType="user"
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
  />      
    <FormInput
    labelValue={password}
    onChangeText={(userPassword) => setPassword(userPassword)}
    placeholderText="Password"
    iconType="lock"
    secureTextEntry={true}
  /> 
  <FormButton
    buttonTitle="Sign In"
    onPress={handleLogin}
  />
  <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('Forgotpassword')}>
    <Text style={styles.navButtonText}>Forgot Password?</Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => navigation.navigate('Signup')}>
    <Text style={styles.navButtonText}>
      Don't have an acount? Create here
    </Text>
  </TouchableOpacity>
</View>
);
};

export default LoginScreen;


const styles = StyleSheet.create({
container: {
justifyContent: 'center',
alignItems: 'center',
padding: 20,
paddingTop: 50,
},
logo: {
height: 150,
width: 150,
resizeMode: 'cover',
},
text: {
fontFamily: 'Kufam-SemiBoldItalic',
fontSize: 28,
marginBottom: 10,
color: 'white',
},
navButton: {
marginTop: 15,
},
forgotButton: {
marginVertical: 35,
},
navButtonText: {
fontSize: 18,
fontWeight: '500',
color: '#fff',
fontFamily: 'Lato-Regular',
},
});