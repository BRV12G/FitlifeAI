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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "@/contexts/userContext";
import { axiosWithAuth } from "../utils/api";

const sleepDisorderOptions = ["None", "Insomnia", "Sleep Apnea", "Narcolepsy"];

const Page5 = () => {
  const { userInfo, updateUserInfo } = useUser();
  const [heartrate, setHeartRate] = useState<number>(0);
  const [dailySteps, setDailySteps] = useState<number>(0);
  const [sleepDisorder, setSleepDisorder] = useState<string>("");

  const { username } = useLocalSearchParams();
  const router = useRouter();

  const handleNext = async () => {
    if (!heartrate || !dailySteps || !sleepDisorder) {
      alert("Please fill all fields!");
      return;
    }

    const userData = { heartrate, dailySteps, sleepDisorder };

    try {
      const api = await axiosWithAuth();
      const response = await api.post("/api/user-input/page5/", userData);

      if (response.status === 200) {
        updateUserInfo(userData);
        router.push({
          pathname: "/home/homeScreen",
          params: { username },
        });
      } else {
        alert("Failed to save data");
      }
    } catch (error: any) {
      console.error("Error saving data:", error);
      alert("Error: " + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
       <Image
          source={require("@/assets/images/inputpages/page5.png")} // <-- Replace with your image
          style={styles.topRightImage}
        />
      <View style={styles.card}>
        

        <Text style={styles.welcomeText}>🛌 Rest, Steps & Heart</Text>

        <Text style={styles.label}>💓 What’s your resting heart rate?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 72"
          value={heartrate.toString()}
          onChangeText={(text) => setHeartRate(Number(text))}
          keyboardType="numeric"
        />

        <Text style={styles.label}>🚶‍♂️ How many steps do you walk daily?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 5000"
          value={dailySteps.toString()}
          onChangeText={(text) => setDailySteps(Number(text))}
          keyboardType="numeric"
        />

        <Text style={styles.label}>😴 Do you experience any sleep disorder?</Text>
        <View style={styles.radioContainer}>
          {sleepDisorderOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioButton}
              onPress={() => setSleepDisorder(option)}
            >
              <View
                style={[
                  styles.circle,
                  sleepDisorder === option && styles.selected,
                ]}
              />
              <Text style={styles.radioText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Get My Results</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    position: "relative",
  },
  topRightImage: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 200,
    height: 150,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    backgroundColor: "#fff",
  },
  radioContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
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
    borderColor: "#3A7CA5",
    marginRight: 8,
  },
  selected: {
    backgroundColor: "#3A7CA5",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#3A7CA5",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Page5;
