import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native'
import {FONTS, COLORS, icons} from "../constants"

const TabIcon = ({focused, icon, iconsStyle, label, isTrade }) => {
    if (isTrade) {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: "center",
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "#000000",
                    tintColor: focused ? "#fca311" :'#ffffff',

                }}
            >
                <Image
                    source= {icon}
                    resizeMode = "contain"
                    style = {{
                        width: 25,
                        height: 25,
                        tintColor: focused ? "#fca311" :'#ffffff',
                        ...iconsStyle
                    }}
                />
                <Text style = {{color: COLORS.white, ...FONTS.h4}}>{label}</Text>
            </View>
        )
    } else {
        return (
            <View style = {{alignItems: "center", justifyContent: 'center'}}>
                <Image
                source = {icon}
                resizeMode="contain"
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#fca311" :'#ffffff',
                    ...iconsStyle
                }}
                />
                <Text
                style={{
                    color: focused ? "#fca311" :'#ffffff',
                    ...FONTS.h4
                }}

                >
                    {label}
                </Text>
            </View>
        )
    }
}

export default TabIcon;