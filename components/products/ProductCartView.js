import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../constants";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProductCartView = ({ item }) => {
  const navigation = useNavigation();
  console.log("pd_detail", item);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { item })}
    >
      <View
        style={{
          width: 180,
          height: 253,
          marginEnd: 18,
          borderRadius: SIZES.medium,
          backgroundColor: "#ffffff",
        }}
      >
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.small / 2,
            marginTop: SIZES.small / 2,
            borderRadius: SIZES.small,
            overflow: "hidden",
          }}
        >
          <Image
            style={{ width: 180, height: 200, resizeMode: "contain" }}
            source={{
              uri: item.imageUrl,
            }}
          />
        </View>
        <View style={{ padding: SIZES.small }}>
          <Text
            style={{
              fontWeight: 500,
              fontSize: 15,
              color: "#606060",
              marginBottom: 2,
            }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 2,
              color: "#303030",
            }}
          >
            {Intl.NumberFormat("en-US").format(item.price)} VNĐ
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            position: "absolute",
            bottom: 80,
            right: 12,
          }}
        >
          <Fontisto
            name="shopping-bag"
            size={20}
            color="#606060"
            style={{ opacity: 0.6 }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCartView;
