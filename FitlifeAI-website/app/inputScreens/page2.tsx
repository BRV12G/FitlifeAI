
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
// import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

const SleepScreen = () => {
  const { userInfo, updateUserInfo } = useUser();
  const [sleepHours, setSleepHours] = useState<number>(0);
  const [qualityOfSleep, setQualityOfSleep] = useState<number>(0);
  const [stressLevel, setStressLevel] = useState<number>(0);

  const { username } = useLocalSearchParams();
  const router = useRouter();

  const handleNext = async () => {
    if (!sleepHours || !qualityOfSleep || !stressLevel) {
      alert("Please fill all fields!");
      return;
    }

    updateUserInfo({ sleepHours, qualityOfSleep, stressLevel });

    const userData = {
      sleep_hours: sleepHours,
      quality_of_sleep: qualityOfSleep,
      stress_level: stressLevel,
    };

    try {
      const axiosInstance = await axiosWithAuth();
      const response = await axiosInstance.post(
        "/api/user-input/page2/",
        userData
      );

      if (response.status === 200) {
        router.push("/inputScreens/page3");
      } else {
        alert("Failed to update data");
      }
    } catch (error: unknown) {
      if (error instanceof Error) alert("Error: " + error.message);
      else alert("Unknown error");
    }
  };

  return (
    <ScrollView style={styles.background}>
   
      {/* Optional top-left moon/star image */}
      {/* <Image
        source={require("@/assets/images/inputpages/moon_icon.png")}
        style={styles.cornerImage}
      /> */}

      <View style={styles.card}>
        <Text style={styles.welcomeText}>🌙 Sleep is Important!</Text>

        <Text style={styles.label}>How many hours do you sleep per night?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 7"
          value={sleepHours.toString()}
          onChangeText={(text) => setSleepHours(Number(text))}
          keyboardType="numeric"
          placeholderTextColor="#B0B0B0"
        />

        <Text style={styles.label}>Rate your quality of sleep (1–10)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 8"
          value={qualityOfSleep.toString()}
          onChangeText={(text) => setQualityOfSleep(Number(text))}
          keyboardType="numeric"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>How stressed are you? (1–10)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 3"
          value={stressLevel.toString()}
          onChangeText={(text) => setStressLevel(Number(text))}
          keyboardType="numeric"
          placeholderTextColor="#ccc"
        />
        <Text style={styles.label}>
          Note: This information helps us understand your sleep patterns and
          stress levels.
        </Text>
        

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        
      </View>
      <Image
          source={require("@/assets/images/inputpages/page22.png")}
          style={styles.cornerImage}
        />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
  },
  cornerImage: {
    position: "absolute",
    // bottom: 0,
    // left: 20,
    width: 150,
    height: 230,
    opacity: 0.9,
    // zIndex: 1,
    transform: [{ rotate: "-90deg" }],
    // borderRadius: 20,
    shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // elevation: 2,
    // backgroundColor: "rgba(255, 255, 255, 0.8)",
    bottom: -30,
    left: 120,
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
    marginBottom: 180,
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
    borderColor: "#bbb",
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    color: "#333",
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
