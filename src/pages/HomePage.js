import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
    Image,
} from 'react-native';
import { fetchProductByText } from "../utils/api";
import ItemCard from "../components/ItemCard";
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../components/CartContext';

const Home = ({ navigation }) => {

    const { cartItems } = useCart();

    const [product_r, setProduct_r] = useState([]);
    const [search_product, setSearch_product] = useState('');
    const [search, setSearch] = useState('');
    const [showProduct, setShowProduct] = useState(false);

    useEffect(() => {
        getProduct();
    }, [search]);


    const getProduct = async () => {
        try {
            setShowProduct(true);
            const data = await fetchProductByText();

            const filteredProducts = data.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
            setProduct_r(filteredProducts);
            setShowProduct(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setShowProduct(false);
        }
    };

    const searchBarUpdate = (text) => {
        setSearch_product(text);
    };

    const searchFunction = () => {
        setSearch(search_product);
        setSearch_product('');
    };

    const refreshFunction = () => {
        getProduct();
    };

    const renderProductRows = () => {
        const rows = [];
        const itemsPerRow = 2;
        for (let i = 0; i < product_r.length; i += itemsPerRow) {
            rows.push(
                <View key={i} style={styles.row}>
                    {product_r.slice(i, i + itemsPerRow).map((product, index) => (
                        <ItemCard product={product} key={index} navigation={navigation} />
                    ))}
                </View>
            );
        }
        return rows;
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search products..."
                    value={search_product}
                    onChangeText={searchBarUpdate}
                />
                <TouchableOpacity style={styles.button} onPress={searchFunction}>
                    <Text>Search</Text>
                </TouchableOpacity>
            </View>
            {showProduct ? (
                <ActivityIndicator size="large" color="#FF6F61" style={{ marginTop: 20 }} />
            ) : product_r.length === 0 ? (
                <Text>No products found.</Text>
            ) : (
                <ScrollView
                    refreshControl={<RefreshControl refreshing={showProduct} onRefresh={refreshFunction} />}
                    contentContainerStyle={styles.scrollViewContent}>
                    {renderProductRows()}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 8,
        paddingTop: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 8,

    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginRight: 8,
        paddingHorizontal: 8,
    },
    button: {
        height: 40,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        height: 25,
        aspectRatio: 1

    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Home;
