import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import {
  Cart,
  NewRivals,
  ProductionDetail,
  Login,
  Favorites,
  Orders,
  Register,
  Payment,
} from "./screens";
import { Provider } from "react-redux";
import store from "./store";
import { UserContext } from "./UserContext";
import AddAddressScreen from "./screens/AddAddressScreen";
import AddressScreen from "./screens/Address";
import PlaceOder from "./screens/PlaceOder";
import InfoOrder from "./screens/InfoOrder";
import Comment from "./screens/Comment";
import Webview from "./Webview/Webview";

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Regular.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }

    if (!fontsLoaded) {
      return null;
    }
  }, [fontsLoaded]);

  return (
    <Provider store={store}>
      <UserContext>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Bottom Navigation"
              component={BottomTabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductionDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductList"
              component={NewRivals}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Orders"
              component={Orders}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Address"
              component={AddAddressScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add"
              component={AddressScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Favorites"
              component={Favorites}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlaceOder"
              component={PlaceOder}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InfoOrder"
              component={InfoOrder}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Comment"
              component={Comment}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Webview"
              component={Webview}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext>
    </Provider>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
