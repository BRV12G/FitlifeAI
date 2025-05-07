import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"; // <-- to get params
import { useUser } from "@/contexts/userContext";
import axios from "axios";
import { axiosWithAuth } from "@/app/utils/api";

const SleepScreen = () => {
  const { userInfo, updateUserInfo } = useUser();

  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [bmi, setBmi] = useState<number>(0);
  const [bmiCategory, setBmiCategory] = useState<string>("");

  const { username } = useLocalSearchParams(); // <-- get username
  const router = useRouter(); // <-- initialize router

  const handleNext = async () => {
    if (!height || !weight) {
      alert("Please fill all fields!");
      return;
    }

    const payload = {
      height,
      weight,
    };

    try {
      const axiosInstance = await axiosWithAuth();
      const response = await axiosInstance.post(
        "/api/user-input/page3/",
        payload
      );
      if (response.status === 200) {
        // Navigate to the next page
        router.push("/inputScreens/page4");
      } else {
        alert("Failed to update data");
      }
    } catch (error: unknown) {
      if (error instanceof Error) alert("Error: " + error.message);
      else alert("Unknown error");
    }
    //   console.log("Auth Token:", userInfo.authToken);
    //   updateUserInfo({ height, weight });
    //   router.push("/inputScreens/page4");
    // } catch (error) {
    //   console.error(error);
    //   Alert.alert("Error", "Something went wrong while saving data.");
    // }
  };

  // Convert height (meters) to centimeters
  const convertHeightToCm = () => {
    const converted = height * 100;
    setHeight(Number(converted.toFixed(2)));
  };

  //  Convert height (meters) to inches
  const convertHeightToInches = () => {
    const converted = height * 39.3701;
    setHeight(Number(converted.toFixed(2)));
  };

  // Convert weight (kg) to pounds
  const convertWeightToPounds = () => {
    const converted = weight * 2.20462;
    setWeight(Number(converted.toFixed(2)));
  };

  //  Convert weight (kg) to grams
  const convertWeightToGrams = () => {
    const converted = weight * 1000;
    setWeight(Number(converted.toFixed(2)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Sleep is Important!</Text>

      <Text style={styles.label}>Enter your Height (in cm)</Text>

      <TextInput
        style={styles.input}
        placeholder="height"
        value={height.toString()}
        onChangeText={(text) => setHeight(Number(text))}
        keyboardType="numeric"
      />

      {/* 👇 Buttons to convert height */}
      <View style={styles.convertContainer}>
        <TouchableOpacity
          style={styles.convertButton}
          onPress={convertHeightToCm}
        >
          <Text style={styles.convertButtonText}>To cm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.convertButton}
          onPress={convertHeightToInches}
        >
          <Text style={styles.convertButtonText}>To inches</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Enter your Weight (in kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="weight"
        value={weight.toString()}
        onChangeText={(text) => setWeight(Number(text))}
        keyboardType="numeric"
      />

      {/* 👇 Buttons to convert weight */}
      <View style={styles.convertContainer}>
        <TouchableOpacity
          style={styles.convertButton}
          onPress={convertWeightToPounds}
        >
          <Text style={styles.convertButtonText}>To lbs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.convertButton}
          onPress={convertWeightToGrams}
        >
          <Text style={styles.convertButtonText}>To g</Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  radioContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginTop: 10,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#87ceeb",
    marginRight: 8,
  },
  selected: {
    backgroundColor: "#87ceeb",
  },
  radioText: {
    fontSize: 16,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#3A7CA5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  convertContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  convertButton: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 5,
  },
  convertButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default SleepScreen;
