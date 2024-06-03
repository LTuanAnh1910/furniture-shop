import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES, SHADOWS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const OrderCart = ({ item }) => {
  const data = item.cartItem;
  const navigation = useNavigation();
  console.log(data);

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { item: data })}
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: SIZES.small,
          flexDirection: "row",
          padding: 8,
          borderRadius: SIZES.small,
          backgroundColor: "#fff",
          ...SHADOWS.medium,
          shadowColor: COLORS.lightWhite,
        }}
      >
        <View
          style={{
            width: 60,
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.medium,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 60,
              resizeMode: "cover",
              borderRadius: SIZES.small,
            }}
            source={{ uri: data.imageUrl }}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: SIZES.small }}>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.primary,
              fontFamily: "bold",
            }}
          >
            {data.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
              fontFamily: "regular",
              marginTop: 2,
            }}
          >
            {data.supplier}
          </Text>
          <Text
            style={{
              fontSize: SIZES.small + 2,
              color: COLORS.black,
              fontFamily: "regular",
              marginTop: 3,
            }}
          >
            Số lượng: {item.quantity}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OrderCart;
