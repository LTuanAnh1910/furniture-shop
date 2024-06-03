import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES } from "../../constants";
import ProductCartView from "./ProductCartView";

const ProductList = () => {
  const { data, isLoadinng, error } = useFetch();

  if (isLoadinng) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
        paddingTop: SIZES.xxLarge,
        paddingLeft: SIZES.small / 2,
      }}
    >
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <ProductCartView item={item} />}
        contentContainerStyle={{
          paddingTop: SIZES.xxLarge,
          paddingHorizontal: SIZES.small / 2,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
      />
    </View>
  );
};

export default ProductList;
