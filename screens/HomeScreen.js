import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', name: 'Office Wear', subtext: 'reversible angora cardigan', price: 120, image: require('../assets/dress1.png') },
  { id: '2', name: 'Black', subtext: 'reversible angora cardigan', price: 120, image: require('../assets/dress2.png') },
  { id: '3', name: 'Church Wear', subtext: 'reversible angora cardigan', price: 120, image: require('../assets/dress3.png') },
  { id: '4', name: 'Lamerei', subtext: 'reversible angora cardigan', price: 120, image: require('../assets/dress4.png') },
  { id: '5', name: '21WN', subtext: 'reversible angora cardigan', price: 120, image: require('../assets/dress5.png') },
  { id: '6', name: 'Lopo', subtext: 'reversible angora cardigan', price: 120, image: require('../assets/dress6.png') },
  { id: '7', name: '21WN', subtext: 'reversible angora cardigan', price: 120, image: require('../assets/dress7.png') },
  { id: '8', name: 'Lame', subtext: 'reversible angora cardigan', price: 120, image: require('../assets/dress4.png') },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    const loadCart = async () => {
      const cartItems = await AsyncStorage.getItem('cart');
      if (cartItems) {
        setCart(JSON.parse(cartItems));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.subtext}>{item.subtext}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity style={styles.cartIconContainer} onPress={() => addToCart(item)}>
        <Image source={require('../assets/add_circle.png')} style={styles.cartIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Menu pressed')}>
          <Image source={require('../assets/Menu.png')} style={styles.icon} />
        </TouchableOpacity>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => console.log('Search pressed')}>
            <Image source={require('../assets/Search.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../assets/shoppingBag.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.storyContainer}>
        <Text style={styles.storyText}>Our Story</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => console.log('Filter pressed')}>
            <Image source={require('../assets/Listview.png')} style={styles.smallIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('List pressed')}>
            <Image source={require('../assets/Filter.png')} style={styles.smallIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        key={numColumns} 
        data={products}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        renderItem={renderItem}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    borderBottomColor: '#ddd',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  logo: {
    width: 110,
    height: 44,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  itemContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    position: 'relative',
  },
  image: {
    width: 180,
    height: 300,
    alignSelf: 'center', 
  },
  text: {
    textAlign: 'left',
    marginVertical: 5,
  },
  subtext: {
    textAlign: 'left',
    color: '#666',
    marginBottom: 5,
  },
  price: {
    textAlign: 'left',
    color: '#FF6347', // Tomato color for the price
    marginBottom: 10,
  },
  cartIconContainer: {
    position: 'absolute',
    bottom: 120,
    right: 10,
  },
  cartIcon: {
    width: 40,
    height: 40,
  },
  storyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  storyText: {
    fontSize: 34,
    fontStyle: 'italic',
    marginLeft: 20,
    fontFamily: 'Helvetica Neue',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  smallIcon: {
    width: 30,
    height: 40,
    marginHorizontal: 5,
  },
});

export default HomeScreen;
