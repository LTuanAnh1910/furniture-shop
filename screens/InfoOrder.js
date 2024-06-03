import { View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import OrderItem from "../components/order/OrderItem";
import OrderCart from "../components/order/OrderCart";
import moment from "moment";
import ProductRow from "../components/products/ProductRow";

const InfoOrder = () => {
  const route = useRoute();
  const infoOrder = route.params.item;
  console.log("infoOrder", infoOrder);

  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F0F0F0",
      }}
    >
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 12,
          flexDirection: "row",
          alignContent: "center",
          position: "absolute",
          top: SIZES.xxLarge,
          width: SIZES.width - 44,
          zIndex: 999,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.primary,
            fontFamily: "bold",
            fontSize: SIZES.large,
            marginLeft: 10,
          }}
        >
          Thông tin đơn hàng
        </Text>
      </View>
      <ScrollView>
        <Text style={{ height: 0.5, backgroundColor: "gray", marginTop: 40 }} />
        <View
          style={{
            backgroundColor: COLORS.lightWhite,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              marginHorizontal: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <EvilIcons name="location" size={24} color="black" />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Địa chỉ nhận hàng:
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 30,
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Text>{infoOrder.shippingAddress.name}</Text>
            <Text>(+84){infoOrder.shippingAddress.mobileNo}</Text>
            <Text>
              {infoOrder.shippingAddress.houseNo},{" "}
              {infoOrder.shippingAddress.street},{" "}
              {infoOrder.shippingAddress.district},
              {infoOrder.shippingAddress.city}, Việt Nam
            </Text>
          </View>
        </View>
        <Text style={{ height: 0.5, backgroundColor: "gray" }} />
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              marginHorizontal: 12,
              fontSize: 16,
              fontWeight: "500",
              marginBottom: 4,
            }}
          >
            Sản phẩm:{" "}
          </Text>
          <FlatList
            data={infoOrder.products}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <OrderCart item={item} />}
          />

          <Text
            style={{
              marginHorizontal: 12,
              fontSize: 16,
              fontWeight: 500,
              color: COLORS.primary,
              marginTop: 8,
              marginBottom: 6,
            }}
          >
            Thành tiền:{" "}
            <Text style={{ color: "red", fontSize: 18 }}>
              {Intl.NumberFormat("en-US").format(infoOrder.total)} VNĐ
            </Text>
          </Text>
          <Text
            style={{
              marginHorizontal: 12,
              fontWeight: 500,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            Phương thức thanh toán:{" "}
            {infoOrder.payment_status === "cash" ? "Tiền mặt" : "ZALOPAY"}
          </Text>
        </View>
        <Text style={{ height: 0.5, backgroundColor: "gray" }} />

        <View
          style={{ backgroundColor: COLORS.lightWhite, paddingVertical: 10 }}
        >
          <Text
            style={{
              fontWeight: 500,
              color: COLORS.black,
              fontSize: 16,
              marginHorizontal: 12,
              marginBottom: 6,
            }}
          >
            Mã đơn hàng: {infoOrder._id}
          </Text>
          <Text
            style={{
              fontWeight: 500,
              color: COLORS.black,
              fontSize: 16,
              marginHorizontal: 12,
            }}
          >
            Ngày mua hàng:{" "}
            {moment(infoOrder.createdAt).format("DD/MM/YYYY HH:mm:ss")}
          </Text>
        </View>
        <Text style={{ height: 0.5, backgroundColor: "gray" }} />
        <View
          style={{ backgroundColor: COLORS.lightWhite, paddingVertical: 10 }}
        >
          <Text
            style={{
              fontWeight: 500,
              color: COLORS.black,
              fontSize: 16,
              marginHorizontal: 12,
              marginBottom: 6,
            }}
          >
            Thông tin vận chuyển: {infoOrder.delivery_status}
          </Text>
          <Text
            style={{
              fontWeight: 500,
              color: COLORS.black,
              fontSize: 16,
              marginHorizontal: 12,
            }}
          >
            Ngày mua hàng:{" "}
            {moment(infoOrder.createdAt).format("DD/MM/YYYY HH:mm:ss")}
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.replace("Bottom Navigation")}
          style={{
            height: 40,
            width: 170,
            backgroundColor: "#FF5F00",
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 10,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLORS.lightWhite,
              marginTop: 10,
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Đánh giá sản phầm
          </Text>
        </Pressable>
        <Pressable
          style={{
            height: 40,
            width: 170,
            backgroundColor: COLORS.gray2,
            marginLeft: "auto",
            marginRight: "auto",

            borderRadius: 12,
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLORS.black,
              marginTop: 10,
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Liên hệ cửa hàng
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InfoOrder;
