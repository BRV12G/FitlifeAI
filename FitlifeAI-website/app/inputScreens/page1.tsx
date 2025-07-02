import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "../../contexts/userContext";
import { axiosWithAuth, getAuthToken } from "@/utils/api";
import { useEffect } from "react";
import axios from "axios";

const GenderAgeOccupationScreen = () => {
  const { userInfo, updateUserInfo } = useUser();
  const [gender, setGender] = useState(userInfo.gender || "");
  const [age, setAge] = useState(userInfo.age || "");
  const [occupation, setOccupation] = useState(userInfo.occupation || "");
  const [physicalActivity, setPhysicalActivity] = useState(
    userInfo.physicalActivity || ""
  );

  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUsername = async () => {
      const token = await getAuthToken();
      if (!token) {
        console.warn("Auth token not available yet.");
        return;
      }

      try {
        const api = await axiosWithAuth();
        const response = await api.get("/api/username/");
        setUsername(response.data.username);
      } catch (error) {
        console.error("Failed to fetch username:", error);
      }
    };

    fetchUsername();
  }, []);

  const handleNext = async () => {
    if (!gender || !age || !occupation || !physicalActivity) {
      alert("Please fill all fields!");
      return;
    }

    const userData = {
      gender,
      age: Number(age),
      occupation,
      physical_activity: physicalActivity,
    };

    try {
      const api = await axiosWithAuth();
      const response = await api.post("/api/user-input/page1/", userData);

      if (response.status === 200) {
        updateUserInfo(userData);
        router.push({
          pathname: "/inputScreens/page2",
          params: {
            username,
          },
        });
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error: " + (error.response?.data?.detail || error.message));
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* Content Section */}
      <View style={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Hey there, {username}!</Text>
          <Text style={styles.welcomeText}>Glad to have you with us.</Text>
          <Text style={styles.label}>Tell us about your gender!</Text>

          <View style={styles.radioContainer}>
            {["Male", "Female", "Prefer not to say"].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioButton}
                onPress={() => setGender(option)}
              >
                <View
                  style={[styles.circle, gender === option && styles.selected]}
                />
                <Text style={styles.radioText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>How many years young are you?</Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age.toString()}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholderTextColor="#B0B0B0"
          />

          <Text style={styles.label}>Tell us what you do for a living!</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g.,Student,Engineer, Teacher, Designer..."
            value={occupation}
            onChangeText={setOccupation}
            placeholderTextColor="#B0B0B0"
          />

          <Text style={styles.label}>Let's talk about your physical vibe!</Text>
          <Picker
            style={styles.input}
            selectedValue={physicalActivity}
            onValueChange={setPhysicalActivity}
          >
            <Picker.Item
              label="Select Physical Activity"
              value=""
              style={{ color: "#B0B0B0" }}
            />
            <Picker.Item label="Bring it on! 💪 (High)" value="High" />
            <Picker.Item
              label="I try to stay active! (Medium)"
              value="Medium"
            />
            <Picker.Item label="Taking it easy! (Low)" value="Low" />
          </Picker>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Let’s move forward!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={require("@/assets/images/inputpages/page1.png")}
        style={styles.Image}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3A7CA5",

    textAlign: "center",
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
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
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
    elevation: 5,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});

export default GenderAgeOccupationScreen;
