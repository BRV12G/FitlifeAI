import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
//import api from "./utils/api";
import axios from "axios"; // Import axios
import { useUser } from "../../contexts/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import * as SecureStore from "expo-secure-store";
const { width, height } = Dimensions.get("window");

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const { updateUserInfo } = useUser();

  const handleSignUp = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.44:8000/api/signup/",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          username: username,
          password: password,
        }
      );

      console.log("Signup successful:", response.data);
      await AsyncStorage.setItem("authToken", response.data.token);
      updateUserInfo({ ...response.data.user, token: response.data.token });
      Alert.alert("Success", "You have signed up successfully!");
      router.push("/inputScreens/page1");
    } catch (error) {
      console.error("Error signing up:", error);
      Alert.alert(
        "Error",
        "There was an issue with your signup. Please try again."
      );
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>SIGN UP</Text>
      <Image
        source={require("@/assets/images/signup/girl.png")} // Replace with the path to your image
        style={styles.bottomImage}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
        <LinearGradient colors={["#5A9BD5", "#6BAED6"]} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View>
        <Text style={styles.footerText}>
          already have an account?{" "}
          <Text
            style={styles.loginText}
            onPress={() => router.push("/auth/login")}
          >
            LOGIN
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#3A7CA5",
    borderRadius: 10,
  },
  heading: {
    fontSize: 26,
    color: "#3A7CA5",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 15,
    fontSize: 13,
    color: "#666",
  },
  loginText: {
    color: "#3A7CA5",
    fontWeight: "bold",
  },
  bottomImage: {
    position: "absolute", // Absolute to allow overlap
    top: height * 0.016, // 🔧 Position to overlap half below and half above inputs
    left: width * 0.05, // 🔧 Slightly shifted towards left
    width: 160, // 🔧 Increased size slightly
    height: 500,
    zIndex: -1, // Send image behind input fields
    resizeMode: "contain",
  },
  inputContainer: {
    width: "100%",
  },
});

export default SignUp;
