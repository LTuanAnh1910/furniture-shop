import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";
import { COLORS } from "../constants";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/address/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  //refresh the address when we navigation back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  console.log("address", addresses);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#242424" }}>
        <AntDesign
          name="left"
          size={24}
          color="white"
          style={{ padding: 10 }}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Địa chỉ của bạn
        </Text>
        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#d0d0d0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingHorizontal: 5,
            paddingVertical: 7,
          }}
        >
          <Text>Thêm địa chỉ mới</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {/* all the added address */}
          {addresses.reverse()?.map((item, index) => (
            <Pressable
              key={index}
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                flexDirection: "column",
                marginVertical: 5,
                gap: 5,
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
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

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginTop: 7,
                  alignItems: "center",
                }}
              ></View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
