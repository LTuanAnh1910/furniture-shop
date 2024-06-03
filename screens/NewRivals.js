import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ProductList } from "../components";

const NewRivals = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightWhite,
        }}
      >
        <View
          style={{
            width: SIZES.width - 50,
            marginHorizontal: SIZES.large,
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.large,
            top: SIZES.large,
            zIndex: 999,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "semiBold",
              color: COLORS.lightWhite,
              fontSize: SIZES.medium + 2,
              marginLeft: 10,
            }}
          >
            Sản phẩm
          </Text>
        </View>
        <ProductList />
      </View>
    </SafeAreaView>
  );
};

export default NewRivals;
