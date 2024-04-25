import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../components/CartContext';

const DetailProductPage = ({ route, navigation }) => {
    const { product } = route.params;
    const { addItemToCart } = useCart();

    const addToCart = () => {
        addItemToCart(product);
    };

    useEffect(() => {
        navigation.setOptions({ title: product.title });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image style={styles.image} source={{ uri: product.image }} resizeMode="contain" />
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Text style={styles.rating}>{product.rating.rate}/5 ({product.rating.count} reviews)</Text>
                    <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                        <Text style={styles.buttonText}>Add to Cart ({product.price}€)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 20,
        margin: 10,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
    infoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    rating: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight:"bold"
    },
    addToCartButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DetailProductPage;
