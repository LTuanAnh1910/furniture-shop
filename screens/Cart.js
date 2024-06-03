import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartItem from "../components/cart/CartItem";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const Cart = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  // console.log("data", data);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/api/cart/find/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            setData(response.data);
          } else {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [userId]);

  const handleDeleteItem = (itemId) => {
    // Filter out the deleted item from the cart items
    const updatedData = data.map((item) => ({
      ...item,
      products: item.products.filter((product) => product._id !== itemId),
    }));

    setData(updatedData);
  };

  // console.log("cart", data);

  const totalAmount = data.reduce((acc, order) => {
    return (
      acc +
      order.products.reduce((orderAcc, product) => {
        return orderAcc + parseFloat(product.cartItem.price) * product.quantity;
      }, 0)
    );
  }, 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", marginTop: 10 }}>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          alignContent: "center",
          position: "absolute",
          top: 48,
          width: 300,
          zIndex: 999,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            color: "#242424",
            fontWeight: "bold",
            fontSize: 20,
            marginLeft: 10,
          }}
        >
          Giỏ hàng
        </Text>
      </View>

      <ScrollView style={{ marginTop: 80 }}>
        <View style={{}}>
          {data.map((item, index) => (
            <View key={index}>
              {item.products.map((product, index) => (
                <CartItem
                  items={product}
                  userId={userId}
                  key={index}
                  onDeleteItem={handleDeleteItem}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ marginBottom: 40 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#808080",
            marginBottom: 12,
            marginLeft: 12,
          }}
        >
          Thông tin thanh toán
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 12,
          }}
        >
          <Text style={{ color: "808080", fontWeight: 500, fontSize: 16 }}>
            Tổng cộng
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
            {totalAmount} VNĐ
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Payment", { data, totalAmount })}
          style={{
            backgroundColor: "#242424",
            width: 320,
            height: 48,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 12,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Thanh Toán
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
