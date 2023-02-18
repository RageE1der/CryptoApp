import React, {useEffect, useState}from 'react'; 
import { createStackNavigator } from "@react-navigation/stack"; 
import { NavigationContainer } from '@react-navigation/native'; 
import Tabs from "./navigation/tabs"; 
import { createStore, applyMiddleware} from 'redux'; 
import {Provider} from "react-redux" 
import thunk from 'redux-thunk' 
import rootReducer from "./stores/rootReducer" 
import LoginScreen from './screens2/LoginScreen';
import SingupScreen from './screens2/SignupScreen'
import ChangePasswordScreen from './screens2/ChangePasswordScreen'
import ForgotPasswordScreen from './screens2/ForgotPasswordScreen'
import { Profile } from './screens';
import OnboardingScreen from './screens2/OnBoardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator(); 
const store = createStore( 
    rootReducer, 
    applyMiddleware(thunk) 
) 

const App = () => { 
    const [isFirstLaunch, setIsFirstLaunch] = useState(false);
    
    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
        if (value == false) {
            AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
            setIsFirstLaunch(true);
        } else {
            setIsFirstLaunch(false);
        }
        }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
    
    }, []);
    
    if (isFirstLaunch === null) {
        return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
    } else if (isFirstLaunch == true) {
        routeName = 'OnBoarding';
    } else {
        routeName = 'Login';
    }
    return ( 
        <Provider store = {store}> 
            <NavigationContainer> 
                <Stack.Navigator 
                    screenOptions={{ 
                        headerShown: false 

                    }} 
                > 
                    <Stack.Screen 
                        name="OnBoarding"
                        component={OnboardingScreen} 
                    /> 
                    <Stack.Screen 
                        name="Tab"
                        component={Tabs} 
                    /> 
                    <Stack.Screen 
                        name="Login"
                        component={LoginScreen} 
                    /> 
                    <Stack.Screen 
                        name="Signup"
                        component={SingupScreen} 
                    /> 
                    <Stack.Screen 
                        name="Forgotpassword"
                        component={ForgotPasswordScreen} 
                    /> 
                    <Stack.Screen 
                        name="Changepassword"
                        component={ChangePasswordScreen} 
                    /> 
                    <Stack.Screen 
                        name="Profile"
                        component={Profile} 
                    /> 
                </Stack.Navigator> 
            </NavigationContainer> 
        </Provider> 
    ) 
} 

export default App;  