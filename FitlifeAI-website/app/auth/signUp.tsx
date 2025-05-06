// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// // import LinearGradient from 'react-native-linear-gradient';
// import { LinearGradient } from 'expo-linear-gradient';

// const SignUp = () => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>SIGN UP</Text>

//       <TextInput style={styles.input} placeholder="First name" />
//       <TextInput style={styles.input} placeholder="Last name" />
//       <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
//       <TextInput style={styles.input} placeholder="Username" />
//       <TextInput style={styles.input} placeholder="Password" secureTextEntry />
//       <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry />

//       <TouchableOpacity style={styles.buttonContainer}>
//         <LinearGradient colors={['#5A9BD5', '#6BAED6']} style={styles.button}>
//           <Text style={styles.buttonText}>Sign up</Text>
//         </LinearGradient>
//       </TouchableOpacity>

//       <Text style={styles.footerText}>
//         already have an account?{' '}
//         <Text style={styles.loginText}>LOGIN</Text>
//       </Text>

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 20,
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 26,
//     color: '#3A7CA5',
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     backgroundColor: '#f9f9f9',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 12,
//     marginVertical: 8,
//     borderRadius: 8,
//   },
//   buttonContainer: {
//     width: '100%',
//     marginTop: 20,
//   },
//   button: {
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   footerText: {
//     marginTop: 15,
//     fontSize: 13,
//     color: '#666',
//   },
//   loginText: {
//     color: '#3A7CA5',
//     fontWeight: 'bold',
//   },
// });

// export default SignUp;

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
//import api from "./utils/api";
import axios from "axios"; // Import axios
import { useUser } from "@/contexts/userContext"; // <-- Import context

const SignUp = () => {
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter(); //  Initialize router
  const { updateUserInfo } = useUser(); // <-- ✅ Added: Access updateUserInfo from context

  const handleSignUp = async () => {
    // Basic validation
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

    // Send form data to your Django backend
    try {
      const response = await axios.post("http://localhost:8000/api/signup/", {
        // Replace with your actual backend URL
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
      });

      console.log("Signup successful:", response.data);
      Alert.alert("Success", "You have signed up successfully!");

      // Optionally, you can update the global user info context here
      updateUserInfo({ firstName, lastName, email, username });

      // Navigate to the next page
      router.push("/inputScreens/page1");
    } catch (error) {
      console.error("Error signing up:", error);
      Alert.alert(
        "Error",
        "There was an issue with your signup. Please try again."
      );
    }

    // Reset form
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
      <Image
        source={require("@/assets/images/signup/signup-wave.png")} // Replace with the path to your image
        style={styles.bottomImage}
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
  bottomImage: {
    width: "100%",
    height: 200,
    bottom: 0,
    left: 0,
  },
});

export default SignUp;
