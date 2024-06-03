import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PaymentModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text>Chọn phương thức thanh toán</Text>
          <TouchableOpacity onPress={() => console.log("Cash selected")}>
            <Text>Thanh toán bằng tiền mặt (Cash)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Cart selected")}>
            <Text>Thanh toán bằng thẻ (Cart)</Text>
          </TouchableOpacity>
          <Button title="Đóng" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
