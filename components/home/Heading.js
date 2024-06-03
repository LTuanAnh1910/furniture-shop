import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Heading = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: SIZES.medium,
        //  marginBottom: SIZES.xSmall,
        marginHorizontal: 12,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: "semiBold", fontSize: SIZES.xLarge - 2 }}>
          Sản phẩm mới
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("ProductList")}>
          <Ionicons name="grid" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Heading;
