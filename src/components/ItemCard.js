import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useCart } from '../components/CartContext';

const windowWidth = Dimensions.get('window').width;

const ItemCard = ({ product, navigation }) => {
    const { addItemToCart } = useCart();

    const openProductDetail = () => {
        navigation.navigate('DetailProductPage', { product });
    };

    const addToCart = () => {
        addItemToCart(product);
    };

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={openProductDetail}>
            <View style={styles.card}>
                <Image style={styles.image} source={{ uri: product.image }} resizeMode="contain" />
                <Text style={styles.title}>{product.title}</Text>
                <Text>{product.price}€</Text>
                <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '50%',
        paddingHorizontal: 8,
        marginBottom: 8,
        height: windowWidth * 0.9,
        paddingTop:8
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom:85,
        height: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    addToCartButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        position: 'absolute',
        bottom: 16,

    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default ItemCard;
