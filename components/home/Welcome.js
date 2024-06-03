import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{ width: "100%", flexDirection: "column", alignItems: "center" }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#B3B3B3",
          }}
        >
          Make home
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#242424",
            fontSize: 24,
          }}
        >
          BEAUTIFUL
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F0F0F0",
          borderRadius: SIZES.medium,
          marginVertical: SIZES.medium,
          height: 50,
        }}
      >
        <TouchableOpacity>
          <Ionicons
            name="ios-search-outline"
            size={24}
            color="black"
            style={{ marginHorizontal: 12, color: COLORS.gray }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: "#F0F0F0",
            marginRight: SIZES.small,
            borderRadius: SIZES.small,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              height: "100%",
              paddingHorizontal: SIZES.small,
              fontFamily: "regular",
            }}
            value=""
            onPressIn={() => navigation.navigate("Search")}
            placeholder="Bạn đang tìm kiếm gì ???"
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 50,
              height: "100%",
              backgroundColor: "#F0F0F0",
              borderRadius: SIZES.medium,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="camera-outline" size={SIZES.xLarge} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
