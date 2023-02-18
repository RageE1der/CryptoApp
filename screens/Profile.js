import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image, 
    Switch
} from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import {MainLayout} from './';
import {HeaderBar} from '../componets'
import { FONTS, COLORS, SIZES, dummyData, icons } from '../constants';
import { Rect } from 'react-native-svg';
import FormButton from '../components2/FormButton';
const SectionTitle = ({title}) => {
    return (

        <View
            style={{
                marginTop: SIZES.padding
            }}
        >
            <Text
             style={{
                color: COLORS.white,
                ...FONTS.h3
            }}
            >{title}</Text>
        </View>
    )
}

const Setting = ({title, value, type, onPress}) => {
    if(type =='button') {
        return (
            <TouchableOpacity
                style = {{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center'
                }}
                onPress={onPress}
            >
                <Text style={{
                flex: 1, color: 
                COLORS.white,
                ...FONTS.h3
                }}>{title}</Text>

                <View
                    style ={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{
                        marginRight: SIZES.radius, 
                        color: COLORS.white,
                        ...FONTS.h3
                    }}>{value}</Text>

                    <Image
                        source ={icons.rightArrow}
                        style={{
                            height: 15,
                            width: 15,
                            tintColor: COLORS.white
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }else {
        return (
            <View
                style = {{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center'
                }}
            >
                <Text 
                style = {{
                    flex: 1,
                    color: COLORS.white,
                    ...FONTS.h3
                }}
                > {title}
                </Text>
                <Switch
                    value={value}
                    onValueChange={(value) => onPress(value)}
                >

                </Switch>
            </View>
        )
    }
}

const Profile = () => {
    const [faceId, setFaceId] = React.useState(true)
    const [DarkId, setDarkId] = React.useState(true)
    const [AuthId, setAuthId] = React.useState(false)
    const navigation = useNavigation()
    const HandleSignout =() => {
       auth
       .signOut()
       .then(() => {
           navigation.navigate('Login')
       })
       .catch(error=> alert(error.message)) 
    }
    return (
        <MainLayout>
            <View
                style = {{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.black
                }}
            >
                {/* Header */}
                <HeaderBar
                    title='Profile'
                />

                {/* Details */}
                <ScrollView>
                    {/* email and user id */}
                    <View
                    style = {{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        color: COLORS.white
                    }}
                    >
                        {/* email and user id */}
                        <View
                            style = {{
                            flex: 1,
                        }}
                        >
                            <Text
                            style = {{
                                color: COLORS.white,
                                ...FONTS.h3
                            }}
                            >{auth.currentUser?.email}</Text>
                        <Text
                            style = {{
                                color: COLORS.white,
                                ...FONTS.body4
                            }}
                            >{auth.currentUser?.uid}</Text>
                        </View>
                        {/* status */}
                        <View
                        style = {{
                            flexDirection: 'row',
                            alignItems:"center",
                        }}
                        >
                            <Image
                            source = {icons.verified}
                                style={{
                                    height:25,
                                    width: 25,
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base, color: COLORS.lightGreen, ...FONTS.body4}}>Verified</Text>
                        </View>
                    </View>

                    {/* app */}
                    <SectionTitle
                        title='APP'
                    />

                    <Setting
                        title ="Launch Screen"
                        value = 'Home'
                        type ='button'
                        onPress ={() => console.log('Pressed')}
                    />
                      <Setting
                        title ="FaceID"
                        value = {DarkId}
                        type ='switch'
                        onPress ={(value) => setDarkId(value)}
                    />

                    {/* Account */}
                    <SectionTitle
                        title='ACCOUNT'
                    />
                     <Setting
                        title ="Payment Currency"
                        value = 'USD'
                        type ='button'
                        onPress ={() => console.log('Pressed')}
                    />
                     <Setting
                        title ="Language"
                        value = 'EN'
                        type ='button'
                        onPress ={() => console.log('Pressed')}
                    />

                     {/* Security */}
                     <SectionTitle
                        title='SECURITY'
                    />
                     <Setting
                        title ="FaceID"
                        value = {faceId}
                        type ='switch'
                        onPress ={(value) => setFaceId(value)}
                    />
                     <Setting
                        title ="Password Settings"
                        value = ''
                        type ='button'
                        onPress ={() => console.log('Pressed')}
                    />
                    <Setting
                        title ="Change Password or Email"
                        value = ''
                        type ='button'
                        onPress ={() => navigation.navigate('Changepassword')}
                    />
                    <Setting
                        title ="2 Factor Authentication"
                        value = {AuthId}
                        type ='switch'
                        onPress ={(value) => setAuthId(value)}
                    />
                    <FormButton
                    buttonTitle="Logout"
                    onPress={HandleSignout}
                  />
                </ScrollView>
            </View>
        </MainLayout>
    )
}

export default Profile;