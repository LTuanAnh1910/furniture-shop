import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES, SHADOWS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const SearchTitle = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { item })}
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
            source={{ uri: item.imageUrl }}
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
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: SIZES.small + 2,
              color: COLORS.gray2,
              fontFamily: "regular",
              marginTop: 3,
            }}
          >
            {item.supplier}
          </Text>
          <Text
            style={{
              fontSize: SIZES.small + 2,
              color: COLORS.gray2,
              fontFamily: "regular",
              marginTop: 3,
            }}
          >
            ${item.price}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTitle;
