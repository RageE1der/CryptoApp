import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image, 
    Switch,
    StyleSheet,
} from 'react-native';
import FormButton from '../components2/FormButton';
import FormInput from '../components2/FormInput';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import { COLORS } from '../constants';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const navigation = useNavigation()
    const reset = async() => {
    try {
        await auth
        .sendPasswordResetEmail(email)
        .then(() => {
            console.log('Password reset email sent successfully')
            navigation.navigate("Login");
        })} catch (e) {
            setShowLoading(false);
            alert(
                e.message
            );
        }
            
    };
    return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary}}>
            <View  style={{alignItems: 'center',paddingTop:30}}>
                <Text style={{    
                    fontFamily: 'Kufam-SemiBoldItalic',
                    fontSize: 28,
                    marginBottom: 30,
                    color: 'white',
                    }}
                >
                Forgot Password</Text>
                <FormInput
                    labelValue={email}
                    onChangeText={(userEmail) => setEmail(userEmail)}
                    placeholderText="Email"
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                    
                <FormButton
                    style={{alignItems: 'center', paddingTop:30}}
                    buttonTitle="Cancle"
                    onPress={() => navigation.navigate("Login")}
                />
                <FormButton
                    style={{alignItems: 'center',paddingTop:30}}
                    buttonTitle="Change Password"
                    onPress={reset}
                />
            </View>
        </View>
    )
}
export default ForgotPasswordScreen

const styles = StyleSheet.create({
    text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:20,
    },
    navButton: {
    marginTop: 15,
    alignItems: 'center',
    },
    navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
    },
    });
    