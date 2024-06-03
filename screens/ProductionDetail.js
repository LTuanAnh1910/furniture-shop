import {
  View,
  Text,
  Image,
  Alert,
  Modal,
  Button,
  Pressable,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../CartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const ProductionDetail = () => {
  const { width, height } = Dimensions.get("window");
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
  const route = useRoute();
  const { item } = route.params;
  console.log("item detail", item);

  const navigation = useNavigation();
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  console.log(count);

  const addCart = async () => {
    const cart = {
      userId: userId,
      cartItem: item._id,
      quantity: count,
    };
    await axios
      .post("http://localhost:3000/api/cart", cart)
      .then((response) => {
        if (response.status === 200) {
          Alert.alert("Đã thêm vào giỏ hàng");
          console.log(cart);
        } else {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addFavorites = async () => {
    const heart = {
      userId: userId,
      cartItem: item._id,
    };
    try {
      await axios.post("http://localhost:3000/api/heart", heart);
      Alert.alert("Đã thêm vào sản phẩm yêu thích");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          position: "absolute",
          top: 44,
          width: width - 40,
          zIndex: 999,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => addFavorites()}>
          <Ionicons name="heart" size={30} color="#cccccc" />
        </TouchableOpacity>
      </View>

      <Image
        style={{ aspectRatio: 1, resizeMode: "cover" }}
        source={{
          uri: item.imageUrl,
        }}
      />

      <View
        style={{
          marginTop: -20,
          backgroundColor: "#ffffff",
          width: "100%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
            paddingBottom: 12,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: width - 44,
            top: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
              gap: 160,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              {item.title}
            </Text>
          </View>
          <Text style={{ color: "black", fontSize: 14, marginLeft: 260 }}>
            Số lượng: 100
          </Text>
          <View
            style={{
              backgroundColor: "#808080",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 18, color: "#ffffff" }}>
              {item.price} VNĐ
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingBottom: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "96%",
            top: 5,
          }}
        >
          <View
            style={{
              top: 16,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: 12,
            }}
          >
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={{ color: "gray", fontFamily: "medium" }}>(4)</Text>
          </View>
          <View
            style={{
              top: 16,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: 16,
              gap: 10,
            }}
          >
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={20} color="black" />
            </TouchableOpacity>
            <Text style={{ color: "#808080", fontWeight: "600", fontSize: 16 }}>
              {count}
            </Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            marginHorizontal: 12,
            height: 160,
          }}
        >
          <Text
            numberOfLines={10}
            style={{
              fontSize: 14,
              fontWeight: "400",
              textAlign: "justify",
            }}
          >
            {item.description}
          </Text>
        </View>

        <View style={{ marginBottom: 20, marginTop: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#808080",
              padding: 5,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", gap: 6, marginLeft: 12 }}>
              <Ionicons name="location-outline" size={20} color="#ffffff" />
              <Text style={{ color: "#ffffff" }}>{item.product_location}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 6, marginRight: 12 }}>
              <MaterialCommunityIcons
                style={{ color: "#ffffff" }}
                name="truck-delivery-outline"
                size={20}
              />
              <Text style={{ color: "#ffffff" }}>Giao hàng miễn phí</Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Comment", { item })}
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "flex-end",
            marginRight: 12,
          }}
        >
          <Text style={{ color: "#808080", fontSize: 16 }}>Bình luận</Text>
          <AntDesign name="right" size={20} color="#808080" />
        </Pressable>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: -86,
          left: 28,
          marginHorizontal: 12,
          paddingBottom: 10,
          flexDirection: "row",
          gap: 40,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("PlaceOder", { item, count })}
          style={{
            width: 250,
            height: 60,
            backgroundColor: "#242424",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "semiBold",
              fontSize: 18,
              color: "#ffffff",
              textAlign: "center",
              marginTop: 16,
            }}
          >
            Mua ngay
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={addCart}
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            backgroundColor: "#F0F0F0",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fontisto name="shopping-bag" size={24} color="#242424" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductionDetail;
