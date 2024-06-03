import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES, SHADOWS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import { count } from "../backend/models/Products";

const PlaceOder = () => {
  const { userId, setUserId } = useContext(UserType);
  const [selectMethod, setSelectMetod] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectAddress, setSelectAddress] = useState("");

  const route = useRoute();
  const item = route.params;
  const product = item.item;
  console.log("item ol", product);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  const navigation = useNavigation();
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
            productId: item.item._id,
            quantity: item.count,
            payment_status: selectMethod,
            shippingAddress: selectAddress,
          };
          await axios
            .post("http://localhost:3000/api/order/buynow", order)
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
          // Navigation.navigate('card');
          Alert.alert("Chuyển hướng đến trang Card");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView style={{}}>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          marginTop: 10,
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
      <ScrollView style={{ marginTop: 30 }}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductDetail", { product })}
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: SIZES.small,
              flexDirection: "row",
              padding: SIZES.medium,
              borderRadius: SIZES.small,
              backgroundColor: "#fff",
              ...SHADOWS.medium,
              shadowColor: COLORS.lightWhite,
            }}
          >
            <View
              style={{
                width: 70,
                backgroundColor: COLORS.secondary,
                borderRadius: SIZES.medium,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: 65,
                  resizeMode: "cover",
                  borderRadius: SIZES.small,
                }}
                source={{ uri: product.imageUrl }}
              />
            </View>
            <View style={{ flex: 1, marginHorizontal: SIZES.small }}>
              <Text
                style={{
                  fontSize: SIZES.medium,
                  color: COLORS.primary,
                  fontFamily: "bold",
                }}
              >
                {product.title}
              </Text>
              <Text
                style={{
                  fontSize: SIZES.small + 2,
                  color: COLORS.gray2,
                  fontFamily: "regular",
                  marginTop: 3,
                }}
              >
                {product.supplier}
              </Text>
              <Text
                style={{
                  fontSize: SIZES.small + 2,
                  color: COLORS.gray2,
                  fontFamily: "regular",
                  marginTop: 3,
                }}
              >
                {product.price} * {item.count}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10, marginLeft: 12 }}>
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
              Thanh toán qua VNPAY
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
        <View style={{ marginTop: 20, marginLeft: 12 }}>
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
                    {item?.houseNo} {item?.street}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.district}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.city}, Việt Nam
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    SĐT: {item?.mobileNo}
                  </Text>
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
            style={{
              fontFamily: "bold",
              fontSize: 18,
              color: COLORS.lightWhite,
            }}
          >
            Mua ngay
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceOder;
