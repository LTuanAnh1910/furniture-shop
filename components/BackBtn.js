import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const BackBtn = () => {
  return (
    <TouchableOpacity>
      <Ionicons name="chevron-back-circle" size={24} color={COLORS.gray} />
    </TouchableOpacity>
  );
};

export default BackBtn;
