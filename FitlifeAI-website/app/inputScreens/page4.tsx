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
// import { axiosWithAuth } from "../utils/api";

// const bloodPressureOptions = ["Normal", "Hypertension", "Prehypertension"];

// const bloodPressureScreen = () => {
//   const { userInfo, updateUserInfo } = useUser();
//   const [bloodPressureCategory, setBloodPressureCategory] =
//     useState<string>("");
//   const [systolicPressure, setSystolicPressure] = useState<number>(0);
//   const [diastolicPressure, setDiastolicPressure] = useState<number>(0);

//   const { username } = useLocalSearchParams();
//   const router = useRouter();

//   const handleNext = async () => {
//     if (!bloodPressureCategory && (!systolicPressure || !diastolicPressure)) {
//       alert("Please fill all fields!");
//       return;
//     }

//     const userData = {
//       bloodPressureCategory,
//       systolicPressure,
//       diastolicPressure,
//     };

//     try {
//       const api = await axiosWithAuth();
//       const response = await api.post("/api/user-input/page4/", userData);

//       if (response.status === 200) {
//         updateUserInfo(userData); // Save in context
//         router.push({
//           pathname: "/inputScreens/page5",
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

//   return (
//     <View style={styles.card}>
//       <Text style={styles.welcomeText}>Blood Pressure Check-In</Text>

//       <Text style={styles.label}>How would you categorize your blood pressure?</Text>

//       {/* <TextInput
//         style={styles.input}
//         placeholder="blood pressure category"
//         value={bloodPressureCategory}
//         onChangeText={(text) => setBloodPressureCategory(text)}
//       /> */}

//       <View style={styles.radioContainer}>
//         {bloodPressureOptions.map((option) => (
//           <TouchableOpacity
//             key={option}
//             style={styles.radioButton}
//             onPress={() => setBloodPressureCategory(option)}
//           >
//             <View
//               style={[
//                 styles.circle,
//                 bloodPressureCategory === option && styles.selected,
//               ]}
//             />
//             <Text style={styles.radioText}>{option}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <Text style={styles.descriptionText}>
//       Your blood pressure is made up of two numbers:
//       {"\n"}• <Text style={{ fontWeight: "bold" }}>Systolic</Text>: the pressure when your heart beats.
//       {"\n"}• <Text style={{ fontWeight: "bold" }}>Diastolic</Text>: the pressure when your heart rests.</Text>

//       <Text style={styles.label}>Enter your Systolic Pressure (mmHg)</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="systolic pressure"
//         value={systolicPressure.toString()}
//         onChangeText={(text) => setSystolicPressure(Number(text))}
//         keyboardType="numeric"
//       />

//       <Text style={styles.label}>Now your Diastolic Pressure (mmHg)</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="diastolic pressure"
//         value={diastolicPressure.toString()}
//         onChangeText={(text) => setDiastolicPressure(Number(text))}
//         keyboardType="numeric"
//       />

//       {/* Next Button */}
//       <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//         <Text style={styles.nextButtonText}>All Set — Next!</Text>
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
//   radioContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 10,
//   },
//   radioButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 20,
//     marginTop: 10,
//   },
//   circle: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     borderWidth: 2,
//     borderColor: "#87ceeb",
//     marginRight: 8,
//   },
//   selected: {
//     backgroundColor: "#87ceeb",
//   },
//   radioText: {
//     fontSize: 16,
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
//   descriptionText: {
//     fontSize: 14,
//     textAlign: "center",
//     color: "#555",
//     marginBottom: 20,
//     lineHeight: 20,
//     marginTop: 20,
//   },
//   card: {
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderRadius: 20,
//     padding: 20,
//     width: "100%",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 6,
//   },

// });

// export default bloodPressureScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "../../contexts/userContext";
import { axiosWithAuth } from "../../utils/api";

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
        updateUserInfo(userData);
        router.push({
          pathname: "/inputScreens/page5",
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
    <ImageBackground
      source={require("@/assets/images/inputpages/page_4.png")} // replace with your image
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>💓 Blood Pressure Check-In</Text>

          <Text style={styles.label}>
            Which category best describes your BP today?
          </Text>

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

          <Text style={styles.descriptionText}>
            Blood pressure consists of two values:
            {"\n"}• <Text style={{ fontWeight: "bold" }}>Systolic</Text>:
            pressure when your heart beats.
            {"\n"}• <Text style={{ fontWeight: "bold" }}>Diastolic</Text>:
            pressure when it rests.
          </Text>

          <Text style={styles.label}>Your Systolic Pressure (mmHg)</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., 120"
            value={systolicPressure.toString()}
            onChangeText={(text) => setSystolicPressure(Number(text))}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Your Diastolic Pressure (mmHg)</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., 80"
            value={diastolicPressure.toString()}
            onChangeText={(text) => setDiastolicPressure(Number(text))}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>All Set — Let’s Go!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    opacity: 0.95,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#3A7CA5",
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
    borderColor: "#87ceeb",
    marginRight: 8,
  },
  selected: {
    backgroundColor: "#87ceeb",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
  },
  descriptionText: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginVertical: 20,
    lineHeight: 20,
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

export default bloodPressureScreen;
