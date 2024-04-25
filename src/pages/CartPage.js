import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useCart } from '../components/CartContext';

const CartPage = () => {
    const { cartItems, addItemToCart, removeItemFromCart,clearCart } = useCart();

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice.toFixed(2);
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.card}>

                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: item.image }} resizeMode="contain" />
                </View>
                <Text style={styles.titleCart}>{item.title}</Text>
                <Text>total: {(item.price * item.quantity).toFixed(2)}€ (unit: {item.price}€)</Text>
                <View style={styles.quantityControls}>
                    <TouchableOpacity onPress={() => removeItemFromCart(item)} style={styles.controlButton}>
                        <Text style={styles.controlButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => addItemToCart(item)} style={styles.controlButton}>
                        <Text style={styles.controlButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {cartItems.length === 0 ? (
                <Text style={styles.title}>Cart is empty</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
            <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>Total Price: {calculateTotalPrice()}€</Text>
                <TouchableOpacity onPress={() => clearCart()} style={styles.emptyButton}>
                    <Text style={styles.emptyButtonText}>Empty cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        marginBottom: 4,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        width: '100%',
        height: 150,
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    titleCart: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    quantityControls: {
        marginTop:12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlButton: {
        backgroundColor: 'black',
        borderRadius: 8,
        padding: 10,
        width: 50,
        height: 50,
        justifyContent:"center",
        alignItems:"center"


    },
    controlButtonText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',

    },
    emptyButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    emptyButton: {
        backgroundColor: 'black',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    emptyButtonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    totalPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical:12,
        textAlign:"center"
    },
    quantityText: {
        fontSize: 24,
        marginHorizontal: 10,
        minWidth: 30,
        textAlign: 'center',

    },
});

export default CartPage;
