import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES, SHADOWS, COLORS } from "../../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const CartItem = ({ items, onDeleteItem }) => {
  const navigation = useNavigation();
  const item = items.cartItem;
  const itemId = items._id;
  console.log("itemId", item);

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${itemId}`);
      onDeleteItem(itemId);
      Alert.alert("Xoá sản phẩm công");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { item })}
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          flexDirection: "row",
          padding: 14,
          borderRadius: 12,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            width: 70,
            backgroundColor: "#ffffff",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 66,
              resizeMode: "cover",
              borderRadius: 12,
            }}
            source={{ uri: item.imageUrl }}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <Text
            style={{
              fontSize: 16,
              color: "#999999",
              fontWeight: "bold",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#999999",
              fontWeight: "500",
              marginTop: 4,
            }}
          >
            {item.supplier}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "#242424",
              fontWeight: "500",
              marginTop: 4,
            }}
          >
            {item.price}, SL: {items.quantity}
          </Text>
        </View>

        <View style={{ gap: 16, alignItems: "center" }}>
          <TouchableOpacity onPress={handleDeleteItem}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
          {/* 
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: COLORS.primary,
              width: 88,
              height: 28,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.lightWhite,
                fontFamily: "regular",
                fontSize: 14,
              }}
            >
              Mua ngay
            </Text>
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
