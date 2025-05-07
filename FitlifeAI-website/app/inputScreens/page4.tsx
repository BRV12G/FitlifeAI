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

// const SleepScreen = () => {

//   const { userInfo, updateUserInfo } = useUser();

//   const [bloodPressureCategory, setBloodPressureCategory] = useState<string>('');
//   const [systolicPressure, setSystolicPressure] = useState<number>( 0);
//   const [diastolicPressure, setDiastolicPressure ] = useState<number>(0 );

//   const { username } = useLocalSearchParams(); // <-- get username
//   const router = useRouter(); // <-- initialize router

//   const handleNext = () => {
//     if (!bloodPressureCategory || !systolicPressure || !diastolicPressure) {
//       alert('Please fill all fields!');
//       return;
//     }

//     updateUserInfo({ bloodPressureCategory, systolicPressure, diastolicPressure });

//     router.push('/inputScreens/page5');

//   };

const bloodPressureOptions = ["Normal", "Hypertension", "Prehypertension"];

const bloodPressureScreen = () => {
  const { userInfo, updateUserInfo } = useUser();
  const [bloodPressureCategory, setBloodPressureCategory] =
    useState<string>("");
  const [systolicPressure, setSystolicPressure] = useState<number>(0);
  const [diastolicPressure, setDiastolicPressure] = useState<number>(0);

  const { username } = useLocalSearchParams();
  const router = useRouter();

  const handleNext = async () => {
    if (!bloodPressureCategory && (!systolicPressure || !diastolicPressure)) {
      alert("Please fill all fields!");
      return;
    }

    const userData = {
      bloodPressureCategory,
      systolicPressure,
      diastolicPressure,
    };

    try {
      const api = await axiosWithAuth();
      const response = await api.post("/api/user-input/page4/", userData);

      if (response.status === 200) {
        updateUserInfo(userData); // Save in context
        router.push({
          pathname: "/inputScreens/page5",
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Blood Pressure</Text>

      <Text style={styles.label}>Select your Blood pressure category</Text>

      {/* <TextInput
        style={styles.input}
        placeholder="blood pressure category"
        value={bloodPressureCategory}
        onChangeText={(text) => setBloodPressureCategory(text)}
      /> */}

      <View style={styles.radioContainer}>
        {bloodPressureOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioButton}
            onPress={() => setBloodPressureCategory(option)}
          >
            <View
              style={[
                styles.circle,
                bloodPressureCategory === option && styles.selected,
              ]}
            />
            <Text style={styles.radioText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Systolic Pressure</Text>
      <TextInput
        style={styles.input}
        placeholder="systolic pressure"
        value={systolicPressure.toString()}
        onChangeText={(text) => setSystolicPressure(Number(text))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Diastolic Pressure</Text>
      <TextInput
        style={styles.input}
        placeholder="diastolic pressure"
        value={diastolicPressure.toString()}
        onChangeText={(text) => setDiastolicPressure(Number(text))}
        keyboardType="numeric"
      />

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
});

export default bloodPressureScreen;
