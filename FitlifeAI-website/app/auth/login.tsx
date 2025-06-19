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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useUser } from "../contexts/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { updateUserInfo } = useUser();

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      Alert.alert("Error", "Please enter your credentials.");
      return;
      ("http://192.168.1.44:8000");
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/login/", //browser
        //const response = await fetch("http://192.168.1.44:8000/api/login/", //mobile
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: emailOrUsername,
            password: password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful!");

        await AsyncStorage.setItem("authToken", data.token);
        updateUserInfo({ username: data.username, authToken: data.token });

        router.push({
          pathname: "/inputScreens/page1",
          params: { username: data.username },
        });

        setEmailOrUsername("");
        setPassword("");
      } else {
        Alert.alert("Login failed", data.detail || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("@/assets/images/login/top.png")}
        style={styles.up_image}
      />
      <Text style={styles.heading}>LOGIN</Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <LinearGradient colors={["#5A9BD5", "#6BAED6"]} style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text
            style={styles.loginText}
            onPress={() => router.push("/auth/signUp")}
          >
            SIGN UP
          </Text>
        </Text>
      </View>

      <Image
        source={require("@/assets/images/login/bottom.png")}
        style={styles.bottom_image}
      />
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
  up_image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  bottom_image: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
});

export default Login;
