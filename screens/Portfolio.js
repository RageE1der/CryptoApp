import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Touchable
} from 'react-native';
import {MainLayout} from './';
import {connect} from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getHoldings } from '../stores/market/marketActions';
import { BalanceInfo, Chart } from '../componets';
import { SIZES, COLORS, dummyData, icons, FONTS } from '../constants';

const Portfolio = ({getHoldings, myHoldings}) => {
    
    const [selectedCoin, setSelectedCoin]= React.useState(null)


    useFocusEffect(
        React.useCallback(() => {
            getHoldings(hodings = dummyData.holdings)
        }, [])
    )

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0),0)  
    let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
    let percChange = valueChange/ (totalWallet - valueChange) * 100
    function renderCurrentBalanceSection() {
        return(
            <View
                style ={{
                    paddingHorizontal: SIZES.padding,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: COLORS.gray
                }}
            >
                <Text style={{marginTop: 50, color: COLORS.white, ...FONTS.largeTitle}}>Protfolio</Text>

                <BalanceInfo
                    title='Current Balance'
                    displayAmount={totalWallet}
                    changePct={percChange}
                    containerStyle={{
                        marginTop: SIZES.radius,
                        marginBottom: SIZES.padding
                    }}
                />
            </View>
        )
    }

    return (
        <MainLayout>
            <View
                style = {{
                    flex: 1,
                    backgroundColor: COLORS.black
                }}
            >
                {/* Balance Info */}
                {renderCurrentBalanceSection()}
                {/* Graph or Chart */}
                <Chart
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    chartPrices = {selectedCoin ? selectedCoin?.sparkline_in_7d?.value : myHoldings[0]?.sparkline_in_7d?.value}
                />
                {/* your Assets */}
                <FlatList
                    data = {myHoldings}
                    KeyExtractor ={item => item.id}
                    contentContainerStyle = {{
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding
                    }}
                    ListHeaderComponent = {
                        <View style={{marginBottom: SIZES.radius}}>
                            {/* Section Title*/}
                            <Text 
                            style={{
                                color:COLORS.white,
                                ...FONTS.h3, fontSize: 18
                            }}
                            >
                                Your Assets</Text>

                            {/* Header Lable */}
                            <View
                                style = {{
                                    flexDirection:'row',
                                    marginTop: SIZES.radius,
                                }}
                            >
                                <Text 
                                    style={{
                                        flex: 1,
                                        color: COLORS.white
                                    }}
                                >Asset</Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        color: COLORS.white,
                                        textAlign: 'right'
                                    }}
                                >Prices</Text>
                                <Text
                                    style={{
                                        flex: 1,
                                        color: COLORS.white,
                                        textAlign: 'right'
                                    }}
                                    >Holding
                                </Text>
                            </View>
                        </View>
                    }
                    renderItem={({item})=>{
                        let priceColor = (item.
                        price_change_percentage_7d_in_currency == 0)
                        ? COLORS.white : (item.
                        price_change_percentage_7d_in_currency > 0)
                        ? COLORS.lightGreen : COLORS.red

                        return (
                            <TouchableOpacity
                                style={{
                                    height: 55,
                                    flexDirection: 'row',
                                }}
                                onPress ={() => setSelectedCoin(item)}
                            >
                                {/* Assets */}
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image
                                        source = {{uri: item.image}}
                                        style = {{
                                            height: 20,
                                            width: 20,
                                        }}
                                    />
                                {/* Name */}
                                    <Text
                                        style = {{
                                            marginLeft: SIZES.radius,
                                            color: COLORS.white,
                                            ...FONTS.h4
                                        }}
                                    >
                                    {item.name}
                                    </Text>
                                </View>
                                
                                {/* Figures  or Price*/}
                                <View
                                style={{
                                    flex: 1,
                                    justifyContentL: 'center'
                                }}
                                >
                                    <Text style = {{
                                        textAlign: 'right',
                                        color: COLORS.white,
                                        ...FONTS.h4,
                                        lineHeight: 15,
                                    }}> 
                                    $ {item.current_price.toLocaleString()}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                    {
                                        item.price_change_percentage_7d_in_currency != 0 &&
                                        <Image
                                            source = {icons.upArrow}
                                            style = {{
                                                width: 15,
                                                height: 15,
                                                tintColor: priceColor,
                                                transform: (item.price_change_percentage_7d_in_currency > 0) ? [{rotate: '45deg'}] : [{rotate: '125deg'}]                              
                                                }}
                                        />
                                    }
                                    <Text style={{
                                            marginLeft: 5,
                                            color: priceColor,
                                            ...FONTS.body5,
                                            lineHeight: 15,
                                        }}>
                                            {item.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                                    
                                    </View>
                                </View>

                                    {/* holdings */}
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text
                                        style={{
                                            textAlign: 'right',
                                            color: COLORS.white,
                                            ...FONTS.h4,
                                            lineHeight: 15,
                                        }}
                                        >
                                            $ {item.total.toLocaleString()}
                                        </Text>

                                        <Text
                                            style={{
                                                textAlign: 'right',
                                                color: COLORS.white,
                                                ...FONTS.h4,
                                                lineHeight: 15,
                                            }}
                                        >
                                            {item.qty} {item.symbol.toUpperCase()}
                                        </Text>
                                    </View>
                            </TouchableOpacity>
                        )
                    }}
                    
                />
                    
            </View>
        </MainLayout>
    )
}

// export default Portfolio;

function mapStateToProps(state) {
    return {
        myHoldings: state.marketReducer.myHoldings,
    }

}
function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {},    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
