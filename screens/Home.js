import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { COLORS, SIZES } from "../constants/index";
import { AntDesign } from "@expo/vector-icons";

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Heading from "../components/home/Heading";
import ProductRow from "../components/products/ProductRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import ProductAll from "../components/products/ProductAll";
import Offer from "../components/home/Offer";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState("");
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

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
        <View style={{ marginHorizontal: 22, marginTop: 6, paddingBottom: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="location-outline"
              size={24}
              color="black"
              onPress={() => navigation.navigate("Address")}
            />
            <Text
              style={{
                fontFamily: "semiBold",
                fontSize: SIZES.medium,
                color: COLORS.gray,
              }}
            >
              {/* {address[1].city} */}
              HA NOI
            </Text>

            <View style={{ alignItems: "flex-end" }}>
              <View
                style={{
                  position: "absolute",
                  bottom: 16,
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  alignItems: "center",
                  backgroundColor: "green",
                  justifyContent: "center",
                  zIndex: 99,
                }}
              >
                <Text
                  style={{
                    fontFamily: "regular",
                    color: COLORS.lightWhite,
                    fontSize: 10,
                    fontWeight: "600",
                  }}
                >
                  8
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <FontAwesome5 name="shopping-bag" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={{ marginBottom: 30 }}>
          <Welcome />
          <Carousel />
          <Offer />
          <ProductAll />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
