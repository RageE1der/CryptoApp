import React from 'react';
import {
    View, 
    Text, 
    Image
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';

const BalanceInfo = ({title, displayAmount, changePct, containerStyle}) => {
    return (
        <View style={{...containerStyle}}>
            {/* Title*/}
            <Text style={{...FONTS.h2 ,color: COLORS.white}}>{title}</Text>

            {/* Figures*/}
            <View 
            style={{
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}>
            <Text style={{...FONTS.h2,color: COLORS.white}}>$</Text>
            <Text style={{marginLeft: SIZES.base ,...FONTS.h1 ,color: COLORS.white}}>{displayAmount.toLocaleString()}</Text>
            <Text style={{...FONTS.h2, color: COLORS.white }}> USD</Text>
            </View>
            {/* Change Percentage*/}
            <View
             style={{
                flexDirection: 'row',
                alignItems: 'flex-end'
             }}>
                 {
                     changePct != 0 &&
                     <Image
                        source = {icons.upArrow}
                        style = {{
                            width: 15,
                            height: 15,
                            alignSelf: 'center',
                            tintColor: (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                            transform: (changePct > 0) ? [{rotate:'45deg'}] : [{rotate:'125deg'}]
                        }}
                     />
                }
                <Text
                    style = {{
                        marginLeft: SIZES.base,
                        alignSelf: 'flex-end',
                        color: (changePct== 0) ? COLORS.lightGray3 :
                         (changePct > 0) ? COLORS.white : COLORS.red,
                        ...FONTS.h2
                    }}
                >
                    {changePct.toFixed(2)}
                </Text>
                <Text
                    style = {{
                        marginLeft: SIZES.radius,
                        alignSelf: 'flex-end',
                        color: COLORS.white,
                        ...FONTS.h2
                    }}
                >
                    7 Day change
                </Text>
            </View>


        </View>
    )
}

export default BalanceInfo;