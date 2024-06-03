import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartItem from "../components/cart/CartItem";
import { useNavigation } from "@react-navigation/native";
import HeartItem from "../components/heart/HeartItem";

const Favorites = () => {
  const { userId, setUserId } = useContext(UserType);
  const [heart, setHeart] = useState([]);
  const navigation = useNavigation();
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
    const fetchHeart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/heart/find/${userId}`
        );
        setHeart(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchHeart();
  }, []);

  console.log("heart", heart);
  return (
    <View style={{ marginTop: 10, flex: 1 }}>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          alignContent: "center",
          position: "absolute",
          top: 46,
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
          Sản phẩm yêu thích
        </Text>
      </View>
      <ScrollView style={{ marginTop: 80 }}>
        <View style={{}}>
          {heart?.map((item, index) => (
            <View key={index}>
              {item?.products?.map((product, index) => (
                <HeartItem key={index} items={product} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Favorites;
