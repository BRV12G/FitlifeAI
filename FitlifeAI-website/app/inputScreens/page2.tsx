// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router"; // <-- to get params
// import { useUser } from "@/contexts/userContext";
// import { axiosWithAuth } from "@/app/utils/api"; // <-- use the axiosWithAuth to ensure authentication is included

// const SleepScreen = () => {
//   const { userInfo, updateUserInfo } = useUser();
//   const [sleepHours, setSleepHours] = useState<number>(0);
//   const [qualityOfSleep, setQualityOfSleep] = useState<number>(0);
//   const [stressLevel, setStressLevel] = useState<number>(0);

//   const { username } = useLocalSearchParams(); // <-- get username
//   const router = useRouter(); // <-- initialize router

//   const handleNext = async () => {
//     if (!sleepHours || !qualityOfSleep || !stressLevel) {
//       alert("Please fill all fields!");
//       return;
//     }

//     // Update user data in context
//     updateUserInfo({ sleepHours, qualityOfSleep, stressLevel });

//     const userData = {
//       sleep_hours: sleepHours,
//       quality_of_sleep: qualityOfSleep,
//       stress_level: stressLevel,
//     };

//     try {
//       // Send updated user data to backend
//       const axiosInstance = await axiosWithAuth();
//       const response = await axiosInstance.post(
//         "/api/user-input/page2/",
//         userData
//       );

//       // Check if the response is successful
//       if (response.status === 200) {
//         // Navigate to the next page
//         router.push("/inputScreens/page3");
//       } else {
//         alert("Failed to update data");
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) alert("Error: " + error.message);
//       else alert("Unknown error");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>Sleep is Important!</Text>

//       <Text style={styles.label}>
//         On average, how many hours do you sleep per night?
//       </Text>
//       <TextInput
//         style={styles.input}
//         placeholder="sleep hours"
//         value={sleepHours.toString()}
//         onChangeText={(text) => setSleepHours(Number(text))}
//         keyboardType="numeric"
//       />

//       <Text style={styles.label}>
//         What would you rate your quality of sleep?
//       </Text>
//       <TextInput
//         style={styles.input}
//         placeholder="quality of sleep"
//         value={qualityOfSleep.toString()}
//         onChangeText={(text) => setQualityOfSleep(Number(text))}
//         keyboardType="numeric"
//       />

//       <Text style={styles.label}>Define Your stress level</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="stress level"
//         value={stressLevel.toString()}
//         onChangeText={(text) => setStressLevel(Number(text))}
//         keyboardType="numeric"
//       />

//       {/* Next Button */}
//       <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//         <Text style={styles.nextButtonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   label: {
//     marginTop: 20,
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 8,
//   },
//   nextButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   nextButton: {
//     backgroundColor: "#3A7CA5",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
// });

// export default SleepScreen;



import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "../contexts/userContext";
import { axiosWithAuth } from "@/app/utils/api";

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
      const response = await axiosInstance.post("/api/user-input/page2/", userData);

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
    <ImageBackground
      source={require("@/assets/images/inputpages/page2.png")} // ⬅️ Use your calm background image
      style={styles.background}
      blurRadius={0}
    >
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

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cornerImage: {
    position: "absolute",
    top: 30,
    left: 20,
    width: 100,
    height: 100,
    opacity: 0.9,
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

