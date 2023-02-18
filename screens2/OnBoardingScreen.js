import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '../constants';

const OnboardingScreen = ({navigation}) => {
  return(
    <Onboarding
        onSkip ={() => navigation.replace('Login')}
        onDone ={() => navigation.replace('Login')}
        pages={[
            {
            backgroundColor: COLORS.primary,
            image: <Image source={require('../assets/OnBoardingScreen/chart.png')} />,
            title: 'Net Worth',
            subtitle: 'Quickly visualize your total net worth across all accounts as well as your financial progress over time.',
            },
            {
            backgroundColor: COLORS.primary,
            image: <Image source={require('../assets/OnBoardingScreen/Object.png')} />,
            title: 'Crypto Trading',
            subtitle: 'Buy and sell cryptocurrencies with your fingertips',
            },
            {
            backgroundColor: COLORS.primary,
            image: <Image source={require('../assets/OnBoardingScreen/bank.png')} />,
            title: 'Bank Account',
            subtitle: 'Link all  of your bank accounts and  manage them in a single app.',
            },
            {
            backgroundColor: COLORS.primary,
            image: <Image source={require('../assets/OnBoardingScreen/bell.png')} />,
            title: 'Get Notification',
            subtitle: 'Receive notifications when important events occur, such as payments, deposits or news.',
            },
            
            
        ]}
    />
  );
};
export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});