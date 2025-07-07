// import React from "react";
// import { Button, Alert, StyleSheet } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // or use SecureStore
// import { useRouter } from "expo-router";
// import { useUser } from "../../contexts/userContext"; // adjust path

// const LogoutButton = () => {
//   const router = useRouter();
//   const { updateUserInfo } = useUser();

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("authToken"); // or SecureStore.deleteItemAsync
//       updateUserInfo({}); // clear context
//       router.replace("/auth/login"); // go back to login
//     } catch (error) {
//       Alert.alert("Logout Failed", "Could not log out. Try again.");
//       console.error("Logout error:", error);
//     }
//   };

//   return <Button title="Logout" onPress={handleLogout} style={styles.text}/>;
// };

// export default LogoutButton;

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "transparent", // No color
//     padding: 10,
//     borderRadius: 5,
//   },
//   text: {
//     color: "#007AFF", // iOS default blue, change as needed
//     fontSize: 16,
//   },
// });


import React from "react";
import { TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useUser } from "../../contexts/userContext"; // adjust path

const LogoutButton = () => {
  const router = useRouter();
  const { updateUserInfo } = useUser();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      updateUserInfo({});
      router.replace("/auth/login");
    } catch (error) {
      Alert.alert("Logout Failed", "Could not log out. Try again.");
      console.error("Logout error:", error);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: handleLogout }
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={confirmLogout}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent", // No color
    padding: 3.5,
    borderRadius: 5,
  },
  text: {
    color: "#fff", // iOS default blue, change as needed
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LogoutButton;