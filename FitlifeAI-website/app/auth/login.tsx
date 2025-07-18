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
import { useUser } from "../../contexts/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";


const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // ✅ Added state for toggling password visibility
  const router = useRouter();
  const { updateUserInfo } = useUser();

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      Alert.alert("Error", "Please enter your credentials.");
      return;
      ("http://192.168.1.2:8000");
    }

    try {
      // const response = await fetch(
      // "http://localhost:8000/api/login/", //browser
      const response = await fetch(
        "http://192.168.1.44:8000/api/login/", //mobile
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
        updateUserInfo({ authToken: data.token });

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
        source={require("@/assets/images/login/girl.png")}
        style={styles.up_image}
      />
      <View style={styles.loginContainer}>
        <Text style={styles.heading}>LOGIN</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={emailOrUsername}
          onChangeText={setEmailOrUsername}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        /> */}

        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { flex: 1, borderWidth: 0 }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // ✅ Toggle secureTextEntry
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#666" />
          </TouchableOpacity>
        </View>

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
      </View>

      {/* <Image
        source={require("@/assets/images/login/girl2.png")}
        style={styles.bottom_image}
      /> */}
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
  passwordWrapper: {
    width: "100%", // ✅ Wrapper for password input and toggle
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingRight: 10,
    marginVertical: 8,
  },
  eyeButton: {
    paddingHorizontal: 8, // ✅ Positioning for eye icon
  },
  heading: {
    fontSize: 26,
    color: "#3A7CA5",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    top: 70,
    left: 0,
    right: 0,
    height: 300,
    // resizeMode: "contain",
    // opacity: 0.9,
    width: 200,
    marginBottom: 20,
  },

  bottom_image: {
    position: "absolute",
    bottom: 30,
    // left: 0,
    right: 0,
    height: 250,
  },
  loginContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
  },
});

export default Login;
