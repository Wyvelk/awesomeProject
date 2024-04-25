import React from 'react';
import HomePage from './src/pages/HomePage';
import CartPage from './src/pages/CartPage';
import DetailProductPage from './src/pages/DetailProdcutPage';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { CartProvider} from './src/components/CartContext';
import {Image, Text, TouchableOpacity, View} from "react-native";


const App = () => {

    const cartButton = ({ navigation }) => {
        return (
            <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.navigate('CartPage')}>
                <Image source={require('./assets/cart-solid-24(1).png')} style={{width: 24, height: 24}} />
            </TouchableOpacity>
        );
    };

    return (
        <CartProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="HomePage"
                        component={HomePage}
                        options={({ navigation }) => ({
                            title: 'My eCommerce',
                            headerRight: () => cartButton({ navigation }),
                        })}
                    />
                    <Stack.Screen
                        name="DetailProductPage"
                        component={DetailProductPage}
                        options={({ navigation }) => ({
                            title: 'détail du produit',
                            headerRight: () => cartButton({ navigation }),
                        })}
                    />
                    <Stack.Screen
                        name="CartPage"
                        component={CartPage}
                        options={(navigation)=>{
                           return  { title: 'Cart',navigation }
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
};
export default App;
