import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useState } from "react";
import useFetch from "../../hook/useFetch";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import ProductCartView from "./ProductCartView";
const ProductAll = () => {
  const { data, isLoadinng, error } = useFetch();
  const categories = ["All", "table", "chair", "lamp", "bed", "armchair"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? data
      : data.filter((product) => product.category === selectedCategory);

  return (
    <View style={{ marginTop: 24, marginHorizontal: 12 }}>
      <ScrollView horizontal style={{ flexDirection: "row" }}>
        <Pressable
          onPress={() => setSelectedCategory("All")}
          style={{
            width: 48,
            height: 48,
            backgroundColor: "#242424",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <FontAwesome
            style={{ marginTop: 8 }}
            name="star"
            size={30}
            color="#ffffff"
          />
        </Pressable>
        <Pressable
          onPress={() => setSelectedCategory("chair")}
          style={{
            marginLeft: 24,
            width: 48,
            height: 48,
            backgroundColor: "#F5F5F5",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          {/* <Image
            style={{ marginTop: 6 }}
            source={require("../../assets/images/Chair.png")}
          /> */}
          <FontAwesome5
            style={{ alignItems: "center", marginTop: 10 }}
            name="chair"
            size={24}
            color="gray"
          />
        </Pressable>
        <Pressable
          onPress={() => setSelectedCategory("armchair")}
          style={{
            marginLeft: 24,
            width: 48,
            height: 48,
            backgroundColor: "#F5F5F5",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <MaterialCommunityIcons
            style={{ alignItems: "center", marginTop: 10 }}
            name="sofa-outline"
            size={26}
            color="gray"
          />
        </Pressable>
        <Pressable
          onPress={() => setSelectedCategory("table")}
          style={{
            marginLeft: 24,
            width: 48,
            height: 48,
            backgroundColor: "#F5F5F5",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <MaterialCommunityIcons
            style={{ alignItems: "center", marginTop: 8 }}
            name="table-furniture"
            size={30}
            color="gray"
          />
        </Pressable>

        <Pressable
          onPress={() => setSelectedCategory("bed")}
          style={{
            marginLeft: 24,
            width: 48,
            height: 48,
            backgroundColor: "#F5F5F5",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Ionicons
            style={{ marginTop: 8 }}
            name="bed-outline"
            size={28}
            color="gray"
          />
        </Pressable>
        <Pressable
          onPress={() => setSelectedCategory("lamp")}
          style={{
            marginLeft: 24,
            width: 44,
            height: 44,
            backgroundColor: "#F5F5F5",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <MaterialCommunityIcons
            style={{ marginTop: 8 }}
            name="desk-lamp"
            size={26}
            color="gray"
          />
        </Pressable>
      </ScrollView>

      <FlatList
        data={filteredProducts}
        numColumns={2}
        renderItem={({ item }) => <ProductCartView item={item} />}
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 8,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
      />
    </View>
  );
};

export default ProductAll;
