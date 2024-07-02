import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadCart = async () => {
        const cartItems = await AsyncStorage.getItem('cart');
        if (cartItems) {
          setCart(JSON.parse(cartItems));
        }
      };
      loadCart();
    }, [])
  );

  const removeFromCart = async (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{item.name.toUpperCase()}</Text>
        <Text style={styles.subtext}>{item.subtext}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item)}>
        <Image source={require('../assets/remove.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>C H E C K O U T</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={<View style={styles.listFooter}></View>}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>EST. TOTAL</Text>
        <Text style={styles.totalAmount}>${totalAmount}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>C H E C K O U T</Text>
          <Image source={require('../assets/shoppingBag.png')} style={styles.shoppingBagIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 32,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginVertical: 10,
    fontStyle: 'italic',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
  },
  subtext: {
    fontSize: 16,
    color: '#888',
  },
  itemPrice: {
    fontSize: 18,
    color: '#FF6347', 
  },
  icon: {
    width: 24,
    height: 24,
  },
  listFooter: {
    height: 60, 
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 28,
    color: '#000',
    fontStyle: 'italic',
  },
  totalAmount: {
    fontSize: 28,
    color: '#FF6347', 
  },
  footer: {
    backgroundColor: '#333', 
    padding: 20,
    width: '100%',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
    fontStyle: 'italic',
  },
  shoppingBagIcon: {
    width: 24,
    height: 24,
  },
});

export default CartScreen;
