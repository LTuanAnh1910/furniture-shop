import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES, SHADOWS, COLORS } from "../../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const HeartItem = ({ items }) => {
  const navigation = useNavigation();
  const item = items.cartItem;
  const itemId = items._id;
  console.log("itemId", itemId);

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/heart/${itemId}`);

      Alert.alert("Đã xoá");
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
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#fff",
          // ...SHADOWS.medium,
          // shadowColor: COLORS.lightWhite,
        }}
      >
        <View
          style={{
            width: 70,
            backgroundColor: "#fffffff",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 65,
              resizeMode: "cover",
              borderRadius: 12,
            }}
            source={{ uri: item.imageUrl }}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: SIZES.small }}>
          <Text
            style={{
              fontSize: 18,
              color: "#242424",
              fontWeight: "bold",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              fontWeight: "500",
              marginTop: 6,
            }}
          >
            {item.supplier}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#242424",
              fontWeight: "600",
              marginTop: 8,
            }}
          >
            {Intl.NumberFormat().format(item.price)} VND
          </Text>
        </View>

        <View style={{ gap: 16, alignItems: "center" }}>
          <TouchableOpacity onPress={() => handleDeleteItem()}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: "#242424",
              width: 88,
              height: 28,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Mua ngay
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeartItem;
