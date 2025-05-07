import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useUser } from "@/contexts/userContext";
import { useNavigation } from "@react-navigation/native";
import { axiosWithAuth } from "../utils/api";

const EditProfileScreen = () => {
  const { userInfo, updateUserInfo } = useUser();
  const navigation = useNavigation();

  // Initialize form data as strings for input compatibility
  const [formData, setFormData] = useState({
    firstName: userInfo.firstName || "",
    lastName: userInfo.lastName || "",
    username: userInfo.username || "",
    email: userInfo.email || "",
    age: String(userInfo.age || ""),
    gender: userInfo.gender || "",
    occupation: userInfo.occupation || "",
    physicalActivity: userInfo.physicalActivity || "",
    sleepHours: String(userInfo.sleepHours || ""),
    qualityOfSleep: String(userInfo.qualityOfSleep || ""),
    stressLevel: String(userInfo.stressLevel || ""),
    height: String(userInfo.height || ""),
    weight: String(userInfo.weight || ""),
    bmi: String(userInfo.bmi || ""),
    bmiCategory: userInfo.bmiCategory || "",
    bloodPressureCategory: userInfo.bloodPressureCategory || "",
    systolicPressure: String(userInfo.systolicPressure || ""),
    diastolicPressure: String(userInfo.diastolicPressure || ""),
    heartrate: String(userInfo.heartrate || ""),
    dailySteps: String(userInfo.dailySteps || ""),
    sleepDisorder: userInfo.sleepDisorder || "",
  });

  // Handles text input change
  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handles form submission
  const handleSave = async () => {
    try {
      // Convert types before sending
      const convertedData = {
        ...formData,
        age: parseInt(formData.age),
        sleepHours: parseFloat(formData.sleepHours),
        qualityOfSleep: parseFloat(formData.qualityOfSleep),
        stressLevel: parseFloat(formData.stressLevel),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        bmi: parseFloat(formData.bmi),
        systolicPressure: parseFloat(formData.systolicPressure),
        diastolicPressure: parseFloat(formData.diastolicPressure),
        heartrate: parseFloat(formData.heartrate),
        dailySteps: parseInt(formData.dailySteps),
      };

      const api = await axiosWithAuth();
      const response = await api.put("/api/user-profile/", convertedData);

      updateUserInfo(response.data); // Update context
      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Update failed", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      {Object.entries(formData).map(([key, value]) => (
        <View key={key} style={styles.inputGroup}>
          <Text style={styles.label}>{key}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) =>
              handleChange(key as keyof typeof formData, text)
            }
          />
        </View>
      ))}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6f0fa",
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2980b9",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2980b9",
    marginTop: 20,
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "#6ca0dc",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#1f3a93",
  },
  saveButton: {
    backgroundColor: "#1a73e8",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: "#4a90e2",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
