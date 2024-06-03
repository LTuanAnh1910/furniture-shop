import { View, Text, Alert, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";

const Payment = ({}) => {
  const { userId, setUserId } = useContext(UserType);
  const [selectMethod, setSelectMetod] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectAddress, setSelectAddress] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params.data;
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  console.log("payment", order);

  const cartItemIds = order.flatMap((order) =>
    order.products.map((product) => product.cartItem._id)
  );

  const totalAmount = order.reduce((acc, order) => {
    return (
      acc +
      order.products.reduce((orderAcc, product) => {
        return orderAcc + parseFloat(product.cartItem.price) * product.quantity;
      }, 0)
    );
  }, 0);
  console.log(totalAmount);

  const orders = { order, totalAmount, selectAddress };

  useEffect(() => {
    fetchAddress();
  }, []);
  const handlePaymentMethodSelection = (method) => {
    setSelectMetod(method);
    console.log(selectMethod);
  };
  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/address/${userId}`
      );
      setAddresses(response.data.addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleContinue = async () => {
    try {
      if (selectMethod === "") {
        Alert.alert("Vui lòng chọn phương thức thanh toán trước khi tiếp tục.");
      } else {
        // Chuyển hướng đến trang tương ứng
        if (selectMethod === "cash") {
          const order = {
            userId: userId,
            payment_status: selectMethod,
            shippingAddress: selectAddress,
          };
          await axios
            .post("http://localhost:3000/api/order", order)
            .then((response) => {
              if (response.status === 200) {
                Alert.alert("Success", "Đơn hàng đã được tạo thành công");
                navigation.navigate("Orders");
              } else
                (error) => {
                  console.log(error);
                };
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (selectMethod === "card") {
          const transID = Math.floor(Math.random() * 1000000);

          const itemPayment = {
            items: [order.products],
            amount: totalAmount,
            transID: transID,
          };
          try {
            const info = {
              userId: userId,
              payment_status: selectMethod,
              shippingAddress: selectAddress,
            };
            const response = await axios.post(
              "http://localhost:3000/api/payment",
              itemPayment
            );
            const result = response.data;

            const infoOrder = { info, result, itemPayment };

            navigation.navigate("Webview", infoOrder);
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScrollView style={{ marginTop: 10 }}>
      <View
        style={{
          marginHorizontal: 12,
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
          Thanh toán
        </Text>
      </View>

      <View style={{ marginTop: 80, marginLeft: 12 }}>
        <Text
          style={{
            fontFamily: "bold",
            color: COLORS.gray,
            fontSize: 16,
          }}
        >
          Chọn hình thức thanh toán:
        </Text>
        <TouchableOpacity
          onPress={() => handlePaymentMethodSelection("card")}
          style={{
            flexDirection: "row",
            marginTop: 16,
            alignItems: "center",
            gap: 10,
          }}
        >
          <Feather
            name={selectMethod === "card" ? "check-circle" : "circle"}
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 16, fontFamily: "regular" }}>
            Thanh toán qua ZALOPAY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePaymentMethodSelection("cash")}
          style={{
            flexDirection: "row",
            marginTop: 16,
            alignItems: "center",
            gap: 10,
          }}
        >
          <Feather
            name={selectMethod === "cash" ? "check-circle" : "circle"}
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 16, fontFamily: "regular" }}>
            Thanh toán bằng tiền mặt
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 10, height: 0.5, backgroundColor: "gray" }} />

      <View style={{ marginTop: 10, marginLeft: 12 }}>
        <Text
          style={{
            fontFamily: "bold",
            color: COLORS.gray,
            fontSize: 16,
          }}
        >
          Chọn địa chỉ giao hàng:
        </Text>

        <Pressable>
          {addresses.map((item, index) => (
            <Pressable
              key={index}
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                flexDirection: "row",
                gap: 5,
                paddingBottom: 17,
                marginVertical: 7,
                alignItems: "center",
                borderRadius: 6,
              }}
            >
              {selectAddress && selectAddress._id === item?._id ? (
                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
              ) : (
                <Entypo
                  onPress={() => setSelectAddress(item)}
                  name="circle"
                  size={20}
                  color="gray"
                />
              )}

              <View style={{ marginLeft: 6 }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={20} color="red" />
                </View>
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  {item?.houseNo} {item?.landmark}
                </Text>
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  {item?.street}
                </Text>
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  {item?.city}, Viet Nam
                </Text>
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  Phone No: {item?.mobileNo}
                </Text>
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  District: {item?.district}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    marginTop: 7,
                    alignItems: "center",
                  }}
                ></View>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>

      <TouchableOpacity
        onPress={() => handleContinue()}
        style={{
          height: 46,
          width: 260,
          backgroundColor: COLORS.primary,
          borderRadius: 12,
          marginTop: 20,
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontFamily: "bold", fontSize: 18, color: COLORS.lightWhite }}
        >
          Mua hàng
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Payment;
