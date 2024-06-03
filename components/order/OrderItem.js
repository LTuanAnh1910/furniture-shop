import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import OrderCart from "./OrderCart";
import { COLORS } from "../../constants";
import moment from "moment";

const OrderItem = ({ item }) => {
  const navigation = useNavigation();
  console.log("order", item);

  return (
    <View
      style={{
        width: 380,
        height: 172,
        backgroundColor: "#FFFFFF",
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 14,
          marginTop: 12,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "500", color: "#242424" }}>
          Order No{item._id.slice(16, 27)}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "400", color: "#808080" }}>
          {moment(item.createdAt).format("DD/MM/YYYY")}
        </Text>
      </View>
      <Text style={{ height: 2, backgroundColor: "#F0F0F0", marginTop: 12 }} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 14,
          marginTop: 16,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500", color: "#242424" }}>
          Số lượng SP: {item.products.length}
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "400", color: "#242424" }}>
          Thanh toán: {Intl.NumberFormat("en-US").format(item.total)}VNĐ
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            width: 100,
            height: 36,
            backgroundColor: "#242424",
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("InfoOrder", { item })}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#ffffff",
              textAlign: "center",
              marginTop: 6,
            }}
          >
            Chi tiết
          </Text>
        </Pressable>

        <Text style={{ marginTop: 10, color: "#27AE60", fontSize: 14 }}>
          {item.delivery_status}
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;
