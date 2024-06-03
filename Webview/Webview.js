import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import axios from "axios";
import WebView from "react-native-webview";

const Webview = () => {
  const navigation = useNavigation();
  const [check, setCheck] = useState();
  const route = useRoute();
  const infoOrder = route.params;
  console.log(infoOrder);
  const transID = `${moment().format("YYMMDD")}_${
    infoOrder.itemPayment.transID
  }`;
  const order = infoOrder.info;
  console.log(order);

  const handleClose = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/payment/order-status/${transID}`
      );
      const checkPayment = response.data;
      setCheck(checkPayment.return_code);
    } catch (error) {
      console.log("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    if (check === 1) {
      const createOrder = async () => {
        try {
          await axios.post("http://localhost:3000/api/order", order);
          navigation.replace("Orders", infoOrder);
        } catch (error) {
          console.log(error);
        }
      };
      createOrder();
    }
  });
  // console.log(check);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <WebView source={{ uri: infoOrder.result.order_url }} />
      <TouchableOpacity
        style={{
          height: 30,
          width: 200,
          backgroundColor: "#ffffff",
          borderRadius: 12,
          marginHorizontal: 12,
        }}
        onPress={handleClose}
      >
        <Text style={{ fontSize: 16, fontWeight: 500, color: "#27AE60" }}>
          Quay trở về App
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Webview;
