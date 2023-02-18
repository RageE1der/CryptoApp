import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, } from 'react-native';
import * as firebase from 'firebase';
import FormButton from '../components2/FormButton';
import FormInput from '../components2/FormInput';
import {auth} from './../firebase'
import {COLORS} from '../constants'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
export default class TestScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
    };
  }

  // Occurs when signout is pressed...
  onSignoutPress = () => {
    var {navigate} = this.props.navigation;
    firebase.auth().signOut();
    navigate('Login')
  }

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Changes user's password...
  onChangePasswordPress = () => {
    var {navigate} = this.props.navigation;
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(this.state.newPassword).then(() => {
        Alert.alert("Password was changed");
        navigate('Login')
      }).catch((error) => { Alert.alert(error.message); });
    }).catch((error) => { Alert.alert(error.message) });
  }

  // Changes user's email...
  onChangeEmailPress = () => {
    var {navigate} = this.props.navigation;
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(this.state.newEmail).then(() => {
        Alert.alert("Email was changed");
        navigate('Login')
      }).catch((error) => { Alert.alert(error.message); });
    }).catch((error) => { Alert.alert(error.message) });
  }
  onCancle = () => {
    var {navigate} = this.props.navigation;
    navigate('Tab')
  }
  
  render() {
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary}}>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center',paddingTop: 30}}>
                <FormButton style={{justifyContent: 'center', alignItems: 'center',paddingBottom: 30, paddingTop: 30, color: 'white'}}
                    buttonTitle="Sign out" 
                    onPress={this.onSignoutPress} 
                />
                <FormInput
                        editable = {false}
                        placeholderText={auth.currentUser?.email}
                        iconType="user"
                />  
                <FormInput  
                    value={this.state.currentPassword}
                    placeholder="Current Password" 
                    autoCapitalize="none" 
                    secureTextEntry={true}
                    onChangeText={(text) => { this.setState({currentPassword: text}) }}
                    iconType="lock"
                />

                <FormInput 
                    value={this.state.newPassword}
                    placeholder="New Password" 
                    autoCapitalize="none" 
                    secureTextEntry={true}
                    onChangeText={(text) => { this.setState({newPassword: text}) }}
                    iconType="lock"
                />

                <FormButton 
                    style={{justifyContent: 'center', alignItems: 'center',paddingBottom: 30, paddingTop: 30, color: 'white'}}
                    buttonTitle="Change Password" 
                    onPress={this.onChangePasswordPress} 
                />

                <FormInput value={this.state.newEmail}
                    placeholder="New Email" 
                    autoCapitalize="none" 
                    keyboardType="email-address"
                    iconType="user"
                    onChangeText={(text) => { this.setState({newEmail: text}) }}
                />

                <FormButton style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 30, paddingTop: 30, color: 'white'}}
                    buttonTitle="Change Email" 
                    onPress={this.onChangeEmailPress} 
                />
                <FormButton style={{justifyContent: 'center', alignItems: 'center', color: 'white'}}
                    buttonTitle="Cancle" 
                    onPress={this.onCancle}
                />
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
  textInput: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18, },
});