import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    ColorPropType
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Portfolio, Market, Profile } from "../screens";
import { TabIcon } from "../componets";
import { COLORS, icons } from "../constants";
import {connect} from 'react-redux';
import {setTradeModalvisibility} from '../stores/tab/tabActions'
import { Colors } from "react-native/Libraries/NewAppScreen";
const Tab = createBottomTabNavigator()
const TabBarCompoents = ({children, onPress}) => {
    return(
        <TouchableOpacity
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={onPress}  
        >
            <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
        }}>
            {children}
        </View>
            </TouchableOpacity>
)
}
const Tabs = ({setTradeModalvisibility, isTradeModalVisible}) => {

    function  tradeTabButtonOnClickHandler() {
        setTradeModalvisibility(!isTradeModalVisible)
    }
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                style: {
                    borderTopColor: "transparent",
                    poition: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    borderTopColor: "transparent",
                    height: 125,
                    backgroundColor: COLORS.primary
                },
                tabBarStyle: {
                    backgroundColor: COLORS.primary,
                  },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options = {{
                    headerShown: false,
                    tabBarIcon: ({focused}) => {
                        if(!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.home}
                                    label = "HOME"
                                />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if(isTradeModalVisible) {
                            e.preventDefault ()
                        }
                    }

                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options = {{
                    headerShown: false,
                    tabBarIcon: ({focused}) => {
                        if(!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.briefcase}
                                    label = "PORTFOLIO"
                                />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if(isTradeModalVisible) {
                            e.preventDefault ()
                        }
                    }

                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options = {{
                    headerShown: false,
                    tabBarIcon: ({focused}) => {
                        return (
                            <TabIcon
                                focused={focused}
                                icon={isTradeModalVisible ? icons.close : icons.trade}
                                iconsStyle={isTradeModalVisible ? {
                                    width: 15,
                                    height: 15,

                                }: null }
                                label = "TRADE"
                                isTrade ={true}
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <TabBarCompoents 
                            {...props}
                            onPress={() => tradeTabButtonOnClickHandler()}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options = {{
                    headerShown: false,
                    tabBarIcon: ({focused}) => {
                        if(!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.market}
                                    label = "MARKET"
                                />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if(isTradeModalVisible) {
                            e.preventDefault ()
                        }
                    }

                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options = {{
                    headerShown: false,
                    tabBarIcon: ({focused}) => {
                        if(!isTradeModalVisible) {
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.profile}
                                    label = "PROFILE"
                                />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: e => {
                        if(isTradeModalVisible) {
                            e.preventDefault ()
                        }
                    }

                }}
            />
        </Tab.Navigator>
    )
}

//export default Tabs;

function mapStateToProps(state) {
    return {
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }

}

function mapDispatchToProps(dispatch) {
    return {
        setTradeModalvisibility: (isVisible) => {return dispatch(setTradeModalvisibility(isVisible))}
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);

