import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import axios from "axios";
import moment from "moment";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const Comment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params.item;
  console.log("item cmt", item);
  const [comments, setComments] = useState([]);
  const [review, setReview] = useState("");
  const [userData, setUserData] = useState();
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
  console.log(userId);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCmt = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/comment/${item._id}`
        );
        setComments(response.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };

    fetchCmt();
  }, [item]);

  const handleComment = () => {
    const newComment = {
      productId: item._id,
      userId: userId,
      username: userData.name,
      text: review,
      rating: 4,
    };

    axios
      .post("http://localhost:3000/api/comment/addCmt", newComment)
      .then((response) => {
        setComments((prevComments) => [...prevComments, response.data]);
        setReview("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 12 }}
      >
        <Octicons
          name="chevron-left"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={{ marginLeft: "26%", fontWeight: "bold", fontSize: 18 }}>
          Đánh giá sản phẩm
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginTop: 10,
        }}
      >
        <Image
          source={{ uri: item?.imageUrl }}
          style={{ width: 120, height: 120, borderRadius: 10 }}
        />
        <View style={{ gap: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "#242424" }}>
            {item?.title}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "500" }}>
            {item?.comments?.length} Đánh giá
          </Text>
        </View>
      </View>

      <View
        style={{
          width: 380,
          height: 70,
          marginTop: 10,
          marginHorizontal: 22,
          borderRadius: 12,
          marginBottom: 20,
          backgroundColor: "#FFFFFF",
        }}
      >
        <TextInput
          onChangeText={(text) => setReview(text)}
          style={{ marginTop: 10, marginLeft: 12 }}
          placeholder="Viết đánh giá của bạn..."
          placeholderTextColor={"#808080"}
          value={review}
        />
        <Pressable
          onPress={() => handleComment()}
          style={{
            width: 60,
            height: 30,
            backgroundColor: "#242424",
            position: "absolute",
            bottom: 4,
            right: 8,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              marginTop: 6,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Gửi
          </Text>
        </Pressable>
      </View>

      <Text
        style={{
          height: 2,
          backgroundColor: "#808080",
          width: "100%",
        }}
      />

      <ScrollView style={{ marginTop: 12, height: "100%" }}>
        {comments.map((item, index) => (
          <View
            style={{
              width: 380,
              height: 140,
              backgroundColor: "#ffffff",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 20,
              flexDirection: "column",
              gap: 10,
              borderRadius: 12,
            }}
          >
            <View>
              <View
                style={{
                  marginHorizontal: 14,
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    marginLeft: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item?.username}
                  </Text>
                  {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 16,
                        marginRight: 2,
                      }}
                    >
                      {item?.rating}{" "}
                    </Text>

                    <FontAwesome name="star" size={22} color="#F2C94C" />
                  </View> */}
                </View>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "#808080" }}
                >
                  {moment(item?.updatedAt).format("DD/MM/YYYY")}
                </Text>
              </View>
            </View>
            <Text style={{ marginHorizontal: 12 }}>{item?.text}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Comment;
