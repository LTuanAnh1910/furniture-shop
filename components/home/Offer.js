import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Offer = () => {
  const navigation = useNavigation();
  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% ",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://product.hstatic.net/200000065946/product/pro_1m6_noi_that_moho_giuong_ngu_fiji_16_6d462882f09347e591f4d549af322e60_large.jpg",
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image:
        "https://product.hstatic.net/200000065946/product/pro_nau_noi_that_moho_tu_dau_giuong_go_hobro_6_549626d7accc4eafbffe37bf728f564e_large.jpg",

      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image:
        "https://product.hstatic.net/200000065946/product/pro_mau_tu_nhien_tu_dau_giuong_go_hobro_1_e16580aaf7e146cb801f382a298ea260_large.jpg",

      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image:
        "https://product.hstatic.net/200000065946/product/pro_2m7_chu_i_noi_that_moho_tu_bep_duoi_chu_i_2m7_grenaa_a__2__b1395da714f04c479cfcc88a68872f50_large.jpg",

      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {offers.map((item, index) => (
        <Pressable
          style={{
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 8,
          }}
        >
          <Image
            style={{ width: 150, height: 150, resizeMode: "contain" }}
            source={{ uri: item?.image }}
          />
          <View
            style={{
              backgroundColor: "#e31837",
              paddingVertical: 5,
              width: 130,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              Giảm tới {item?.offer}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Offer;
