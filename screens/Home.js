import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Touchable
} from 'react-native';
import { getHoldings, getCoinMarket, getCoinMarketSuccess } from '../stores/market/marketActions';
import { connect } from 'react-redux';
import {MainLayout} from './';
import { useFocusEffect } from '@react-navigation/native';
import { dummyData, SIZES, COLORS, FONTS, icons } from '../constants';
//import { BorderlessButton } from 'react-native-gesture-handler';
import { BalanceInfo, IconTextButton, Chart } from '../componets';

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins}) => {

    const [selectedCoin, setSelectedCoin]= React.useState(null)

    useFocusEffect(
        React.useCallback(() => {
            getHoldings(dummyData.holdings)
            getCoinMarket()
        }, [])
    )


    useFocusEffect(
        React.useCallback(() => {
            getHoldings(dummyData.holdings)
            getCoinMarket()
        }, [])
    )

        let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0),0)  
        
        let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
        let percChange = valueChange/ (totalWallet - valueChange) * 100 
        function renderWalleteInfoSection() {
            return(
                <View
                    style ={{
                        paddingHorizontal: SIZES.padding,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                        backgroundColor: COLORS.gray
                    }}
                >
                    {/* Balance Info */}
                    <BalanceInfo
                        title = "Your wallet"
                        displayAmount = {totalWallet}
                        changePct={percChange}
                        containerStyle={{
                            marginTop: 50,
                        }}
                    />
                    {/* Buttons */}
                    <View
                       style={{
                           flexDirection: 'row',
                           marginTop: 30,
                           marginBottom: -15,
                           paddingHorizontal: SIZES.radius
                       }}
                    >
                        <IconTextButton
                             label ='TRANSFER'
                             icon = {icons.send}
                             containerStyle= {{
                                 flex: 1,
                                 height: 40,
                                 marginRight: SIZES.radius 
                             }}  
                             onPress={() => console.log("Transfer")    }                   
                        />
                        <IconTextButton
                             label ='WITHDRAW'
                             icon = {icons.withdraw}
                             containerStyle= {{
                                 flex: 1,
                                 height: 40,
                             }}  
                             onPress={() => console.log("Withdraw")    }                   
                        />
                    </View>
                </View>
            )
        }   

    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#000000'
                }} 
            >
                {/* header - wallet Info */}
                {renderWalleteInfoSection()}
                
                {/* Graph */}
                <Chart
                    containerStyle={{
                        marginTop: SIZES.padding * 2
                    }}
                    chartPrices = {selectedCoin ? selectedCoin?.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d?.price}
                />
                {/* top crypto */}
                <FlatList
                    data = {coins}
                    KeyExtractor ={item => item.id}
                    contentContainerStyle = {{
                        marginTop: 30,
                        paddingHorizontal: SIZES.padding
                    }}
                    ListHeaderComponent = {
                        <View style={{marginBottom: SIZES.radius}}>
                            <Text 
                            style={{
                                color:COLORS.white,
                                ...FONTS.h3, fontSize: 18
                            }}
                            >
                                Top CryptoCurrency</Text>
                        </View>
                    }
                    renderItem = {({item}) => {

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
                                    alignItems: "center",
                                    justifyContent: 'center'
                                }}
                                onPress ={() => setSelectedCoin(item)}
                            >
                                {/* Logo */}
                                <View
                                    style={{
                                        widht: 35
                                    }}
                                >
                                    <Image
                                        source = {{uri: item.image}}
                                        style = {{
                                            height: 20,
                                            width: 20,
                                        }}
                                    />
                                </View>
                                {/* Name */}
                                <View
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <Text
                                        source = {{uri: item.image}}
                                        style = {{
                                            color: COLORS.white,
                                            ...FONTS.h3
                                        }}
                                    >
                                    {item.name}
                                    </Text>
                                </View>
                                {/* Figures */}
                                <View>
                                    <Text style = {{textAlign: 'right',
                                color: COLORS.white, ...FONTS.h4}}> $ {item.current_price}</Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContentL: 'flex-end'
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
                                                transform: item.price_change_percentage_7d_in_currency > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}]                              
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
                            </TouchableOpacity>
                        )
                    }}
                    ListFooterComponent ={
                        <View
                            style={{
                                marginBottom: 50,
                            }}
                        />
                    }
                    
                />
            </View>
        </MainLayout>
    )
}


//export default Home;

function mapStateToProps(state) {
    return {
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins
    }

}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => { 
            return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page)) },
        getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => 
        { return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page)) }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);