import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState();
  const { userId, setUserId } = useContext(UserType);

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
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8,
          marginHorizontal: 16,
        }}
      >
        <Ionicons name="search-outline" size={24} color="black" />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Trang cá nhân</Text>
        <Ionicons
          onPress={() => logout()}
          name="log-out-outline"
          size={24}
          color="black"
        />
      </View>
      <View
        style={{
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          marginHorizontal: 16,
        }}
      >
        <Image
          style={{ width: 80, height: 80, borderRadius: 50 }}
          source={require("../assets/images/no-image.png")}
        />
        <View style={{ flexDirection: "column", gap: 4 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {userData?.name}
          </Text>
          <Text style={{ color: "#808080", fontSize: 14, marginTop: 4 }}>
            {userData?.email}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Orders")}
          style={{
            height: 80,
            width: 380,
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            shadowColor: "#808080",
            shadowOffset: { width: 1, height: 6 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            borderRadius: 6,
          }}
        >
          <Text>Đơn hàng</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Favorites")}
          style={{
            height: 80,
            width: 380,
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            shadowColor: "#808080",
            shadowOffset: { width: 1, height: 6 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            borderRadius: 6,
          }}
        >
          <Text>Sản phẩm yêu thích</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={{
            height: 80,
            width: 380,
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            shadowColor: "#808080",
            shadowOffset: { width: 1, height: 6 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            borderRadius: 6,
          }}
        >
          <Text>Giỏ hàng</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Address")}
          style={{
            height: 80,
            width: 380,
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            shadowColor: "#808080",
            shadowOffset: { width: 1, height: 6 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            borderRadius: 6,
          }}
        >
          <Text>Địa chỉ</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={{
            height: 80,
            width: 380,
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            shadowColor: "#808080",
            shadowOffset: { width: 1, height: 6 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            borderRadius: 6,
          }}
        >
          <Text>Cài đặt</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
