import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"; // <-- to get params
import { useUser } from "@/contexts/userContext";
import { axiosWithAuth } from "../utils/api";

const Page5 = () => {
  const { userInfo, updateUserInfo } = useUser();

  const [heartrate, setHeartRate] = useState<number>(0);
  const [dailySteps, setDailySteps] = useState<number>(0);
  const [sleepDisorder, setSleepDisorder] = useState<string>(" ");

  const { username } = useLocalSearchParams(); // <-- get username
  const router = useRouter(); // <-- initialize router

  const handleNext = async () => {
    if (!heartrate || !dailySteps || !sleepDisorder) {
      alert("Please fill all fields!");
      return;
    }

    const userData = {
      heartrate,
      dailySteps,
      sleepDisorder,
    };
    try {
      const api = await axiosWithAuth();
      const response = await api.post("/api/user-input/page5/", userData);

      if (response.status === 200) {
        updateUserInfo(userData); // Save in context
        router.push({
          pathname: "/home/homeScreen",
          params: {
            username,
          },
        });
      } else {
        alert("Failed to save data");
      }
    } catch (error: any) {
      console.error("Error saving data:", error);
      alert("Error: " + (error.response?.data?.detail || error.message));
    }
    //updateUserInfo({ heartrate, dailySteps, sleepDisorder });
    //router.push("/home/homeScreen");
  };

  const sleepDisorderoptions = [
    "None",
    "Insomnia",
    "Sleep Apnea",
    "Narcolepsy",
  ];
  return (
    <View style={styles.container}>
      {/* <Text style={styles.welcomeText}>Sleep is Important!</Text> */}

      <Text style={styles.label}>Enter your Heart Rate</Text>

      <TextInput
        style={styles.input}
        placeholder="Heart Rate"
        value={heartrate.toString()}
        onChangeText={(text) => setHeartRate(Number(text))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>
        Approx how many steps do you walk every day?
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Steps walked per Day"
        value={dailySteps.toString()}
        onChangeText={(text) => setDailySteps(Number(text))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Sleep disorder if any</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="sleep disorder"
        value= {sleepDisorder}
        onChangeText= {(text) => setSleepDisorder(text)}
      /> */}

      <View style={styles.radioContainer}>
        {sleepDisorderoptions.map((option) => (
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

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Get Results</Text>
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
});

export default Page5;
