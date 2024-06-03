import { View, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CartItem from "../components/cart/CartItem";
import OrderItem from "../components/order/OrderItem";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);

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
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/order/${userId}`
        );

        if (isMounted) {
          setOrderData(response.data.reverse());
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  console.log("orderData", orderData);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          alignContent: "center",
          position: "absolute",
          top: 60,
          width: SIZES.width - 44,
          zIndex: 999,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.replace("Bottom Navigation")}
        >
          <Ionicons name="chevron-back-circle" size={30} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            color: "#303030",
            fontFamily: "bold",
            fontSize: SIZES.large,
            marginLeft: 120,
          }}
        >
          Đơn hàng
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginTop: 40,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Vận chuyển</Text>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#808080" }}>
          Đang xử lý
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#808080" }}>
          Đơn huỷ
        </Text>
      </View>

      <ScrollView style={{ marginTop: 4, marginBottom: 30 }}>
        <View>
          {orderData.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
