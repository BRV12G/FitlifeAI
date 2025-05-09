import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "@/contexts/userContext";
import { axiosWithAuth } from "@/app/utils/api";
import { useEffect } from "react";
import axios from "axios";

// const GenderAgeOccupationScreen = () => {
//   const { userInfo, updateUserInfo } = useUser();
//   const [gender, setGender] = useState(userInfo.gender || "");
//   const [age, setAge] = useState(userInfo.age || "");
//   const [occupation, setOccupation] = useState(userInfo.occupation || "");
//   const [physicalActivity, setPhysicalActivity] = useState(
//     userInfo.physicalActivity || ""
//   );

//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const fetchUsername = async () => {
//       try {
//         const response = await axiosWithAuth.get("/api/user-profile/");
//         setUsername(response.data.username); // adjust key if your backend uses a different name
//       } catch (error) {
//         console.error("Failed to fetch username:", error);
//       }
//     };

//     fetchUsername();

//   // const { username } = useLocalSearchParams();
//   // const router = useRouter();

//   const handleNext = async () => {
//     if (!gender || !age || !occupation || !physicalActivity) {
//       alert("Please fill all fields!");
//       return;
//     }

//     const userData = {
//       gender,
//       age: Number(age),
//       occupation,
//       physical_activity: physicalActivity,
//     };

//     try {
//       const api = await axiosWithAuth();
//       const response = await api.post("/api/user-input/page1/", userData);

//       if (response.status === 200) {
//         updateUserInfo(userData); // Save in context
//         router.push({
//           pathname: "/inputScreens/page2",
//           params: {
//             username,
//           },
//         });
//       } else {
//         alert("Failed to save data");
//       }
//     } catch (error: any) {
//       console.error("Error saving data:", error);
//       alert("Error: " + (error.response?.data?.detail || error.message));
//     }
//   };
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
      try {
        const api = await axiosWithAuth();
        const response = await api.get("/api/username/");
        setUsername(response.data.username); // Adjust key if needed
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
        updateUserInfo(userData); // Save in context
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
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {username}</Text>

      <Text style={styles.label}>What is your gender?</Text>
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

      <Text style={styles.label}>Please enter your age</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age.toString()}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Occupation</Text>
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={occupation}
        onChangeText={setOccupation}
      />

      <Text style={styles.label}>Physical Activity Level</Text>
      <TextInput
        style={styles.input}
        placeholder="Physical activity level"
        value={physicalActivity}
        onChangeText={setPhysicalActivity}
      />

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

export default GenderAgeOccupationScreen;
