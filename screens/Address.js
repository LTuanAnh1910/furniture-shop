import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const AddressScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      district,
      city,
    };
    axios
      .post("http://localhost:3000/api/users/address", { userId, address })
      .then((response) => {
        Alert.alert("Success", "Thêm địa chỉ hoàn tất");
        setName("");
        setHouseNo("");
        setMobileNo("");
        setStreet("");
        setDistrict("");
        setCity("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error");
        console.log("err", error);
      });
  };
  console.log(userId);
  return (
    <ScrollView style={{ marginTop: 50 }}>
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
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Thêm địa chỉ mới
        </Text>

        <TextInput
          placeholder="Việt Nam"
          placeholderTextColor={"black"}
          style={{
            padding: 10,
            borderColor: "#d0d0d0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Họ Tên</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Nhập tên"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Số ĐT</Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholder="Nhập sđt"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Số nhà</Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholder="Nhập số nhà"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Tên đường, Xã
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholder="Nhập tên đường, xã"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Quận, Huyện</Text>
          <TextInput
            value={district}
            onChangeText={(text) => setDistrict(text)}
            placeholder="Nhập quận, huyện"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Thành Phố, Tỉnh
          </Text>
          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            placeholder="Nhập tỉnh, thành phố"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#242424",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#ffffff" }}>
            Thêm địa chỉ
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
