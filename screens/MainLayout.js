import React from 'react';
import {
    View,
    Animated
} from 'react-native';
import { IconTextButton } from '../componets';
import { connect } from 'react-redux';
import { COLORS, icons, SIZES, label} from "../constants";
import { color } from 'react-native-reanimated';

const MainLayout = ({children, isTradeModalVisible}) => {

    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if(isTradeModalVisible){
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start();
        }
    }, [isTradeModalVisible])

     const modalY = modalAnimatedValue.interpolate({
        inputRange: [0,1],
        outputRange: [SIZES.height, SIZES.height - 300]
    })

    return (
        <View
            style={{
                flex: 1
            }}
        >
            {children}

            {/* Modal */ }
            <Animated.View
                style = {{
                    position: 'absolute',
                    left: 0,
                    top: modalY,
                    width: "100%",
                    padding: SIZES.padding,
                    backgroundColor: '#3B3B3B'
                }}
            >
                <IconTextButton
                    /* fix lable */
                    label = "Transfer"
                    icon={icons.send}
                    onPress={() => console.log("Transfer")}
                />
                <IconTextButton
                    /* fix lable */
                    label = "Withdraw"
                    icon={icons.withdraw}
                    containerStyle ={{
                        marginTop: SIZES.base
                    }}
                    onPress={() => console.log("Withdraw")}
                />
            </Animated.View>
        </View>
    )
}

//export default MainLayout;

function mapStateToProps(state) {
    return {
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }

}

function mapDispatchToProps(dispatch) {
    return {
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);

