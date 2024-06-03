import { View, Text } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";

const Carousel = () => {
  const slides = [
    "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_3.jpg?v=582",
    "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_5.jpg?v=582",
    "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_1_master.jpg?v=582",
  ];
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageCoComponentStyle={{ boderRadius: 15, with: "92%", marginTop: 15 }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;
