import React from "react";
import { Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // or use SecureStore
import { useRouter } from "expo-router";
import { useUser } from "../contexts/userContext"; // adjust path

const LogoutButton = () => {
  const router = useRouter();
  const { updateUserInfo } = useUser();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken"); // or SecureStore.deleteItemAsync
      updateUserInfo({}); // clear context
      router.replace("/auth/login"); // go back to login
    } catch (error) {
      Alert.alert("Logout Failed", "Could not log out. Try again.");
      console.error("Logout error:", error);
    }
  };

  return <Button title="Logout" onPress={handleLogout} color="red" />;
};

export default LogoutButton;
