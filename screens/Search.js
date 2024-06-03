import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import SearchTitle from "../components/products/SearchTitle";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  console.log(searchResult);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/search/${searchKey}`
      );
      setSearchResult(response.data);
    } catch (error) {
      console.log("failed to search", error);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#DBDBDB",

          borderRadius: SIZES.medium,
          marginVertical: SIZES.medium,
          height: 50,
        }}
      >
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={24}
            color="black"
            style={{ marginHorizontal: 12, color: COLORS.gray }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: "#DBDBDB",

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
            value={searchKey}
            onChangeText={(text) => setSearchKey(text)}
            onPressIn={() => {}}
            placeholder="Bạn đang tìm kiếm gì ???"
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => handleSearch()}
            style={{
              width: 50,
              height: "100%",
              backgroundColor: "#DBDBDB",
              borderRadius: SIZES.medium,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="ios-search-outline"
              size={SIZES.xLarge}
              color="#808080"
            />
          </TouchableOpacity>
        </View>
      </View>

      {searchResult.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/Pose23.png")}
            style={{
              resizeMode: "contain",
              width: SIZES.width - 100,
              height: SIZES.height - 300,
              opacity: 0.9,
            }}
          />
        </View>
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTitle item={item} />}
          style={{ marginHorizontal: 12 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
