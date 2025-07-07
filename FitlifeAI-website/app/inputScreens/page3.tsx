
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "../../contexts/userContext";
import { axiosWithAuth } from "@/utils/api";

const SleepScreen = () => {
  const { updateUserInfo } = useUser();
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const { username } = useLocalSearchParams();
  const router = useRouter();

  const handleNext = async () => {
    if (!height || !weight) {
      alert("Please fill all fields!");
      return;
    }

    const payload = { height, weight };

    try {
      const axiosInstance = await axiosWithAuth();
      const response = await axiosInstance.post(
        "/api/user-input/page3/",
        payload
      );
      if (response.status === 200) {
        router.push("/inputScreens/page4");
      } else {
        alert("Failed to update data");
      }
    } catch (error: unknown) {
      if (error instanceof Error) alert("Error: " + error.message);
      else alert("Unknown error");
    }
  };

  return (
    <View style={styles.background}>
      <Image
        source={require("@/assets/images/inputpages/page_3_1.png")}
        style={styles.cornerImage}
      />

      <View style={styles.card}>
        <Text style={styles.welcomeText}> Know Your Numbers</Text>

        <Text style={styles.label}> How tall are you? (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 170"
          value={height.toString()}
          onChangeText={(text) => setHeight(Number(text))}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}> How much do you weigh? (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 65"
          value={weight.toString()}
          onChangeText={(text) => setWeight(Number(text))}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Sounds good, let’s go </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("@/assets/images/inputpages/page_3_2.png")}
        style={styles.cornerImage2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5FAFF",
    position: "relative",
  },
  cornerImage: {
    position: "absolute",
    top: -20,
    left: 5,
    width: 100,
    height: 290,
    opacity: 0.8,
    zIndex: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    // bottom: -30,
  },
  cornerImage2: {
    position: "absolute",
    bottom: -20,
    right: 20,
    width: 150,
    height: 250,
    zIndex: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3A7CA5",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    color: "#000",
  },
  nextButton: {
    backgroundColor: "#3A7CA5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SleepScreen;
