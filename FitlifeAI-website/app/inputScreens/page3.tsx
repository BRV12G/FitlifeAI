// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router"; // <-- to get params
// import { useUser } from "@/contexts/userContext";
// import axios from "axios";
// import { axiosWithAuth } from "@/app/utils/api";

// const SleepScreen = () => {
//   const { userInfo, updateUserInfo } = useUser();

//   const [height, setHeight] = useState<number>(0);
//   const [weight, setWeight] = useState<number>(0);
//   const [bmi, setBmi] = useState<number>(0);
//   const [bmiCategory, setBmiCategory] = useState<string>("");

//   const { username } = useLocalSearchParams(); // <-- get username
//   const router = useRouter(); // <-- initialize router

//   const handleNext = async () => {
//     if (!height || !weight) {
//       alert("Please fill all fields!");
//       return;
//     }

//     const payload = {
//       height,
//       weight,
//     };

//     try {
//       const axiosInstance = await axiosWithAuth();
//       const response = await axiosInstance.post(
//         "/api/user-input/page3/",
//         payload
//       );
//       if (response.status === 200) {
//         // Navigate to the next page
//         router.push("/inputScreens/page4");
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

//       <Text style={styles.label}>Enter your Height (in cm)</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="height"
//         value={height.toString()}
//         onChangeText={(text) => setHeight(Number(text))}
//         keyboardType="numeric"
//       />

      

//       <Text style={styles.label}>Enter your Weight (in kg)</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="weight"
//         value={weight.toString()}
//         onChangeText={(text) => setWeight(Number(text))}
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
//   convertContainer: {
//     flexDirection: "row",
//     marginTop: 10,
//     justifyContent: "space-between",
//   },
//   convertButton: {
//     flex: 1,
//     backgroundColor: "#eee",
//     padding: 10,
//     borderRadius: 6,
//     alignItems: "center",
//     marginHorizontal: 5,
//   },
//   convertButtonText: {
//     fontSize: 14,
//     fontWeight: "500",
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
  const { updateUserInfo } = useUser();
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const { username } = useLocalSearchParams();
  const router = useRouter();

  const handleNext = async () => {
    if (!height || !weight) {
      alert("Please fill all fields!");
      return;
    }

    const payload = { height, weight };

    try {
      const axiosInstance = await axiosWithAuth();
      const response = await axiosInstance.post("/api/user-input/page3/", payload);
      if (response.status === 200) {
        router.push("/inputScreens/page4");
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
      source={require("@/assets/images/inputpages/page3.png")}
      style={styles.background}
      // blurRadius={4}
    >
      <Image
        source={require("@/assets/images/inputpages/page3.png")}
        style={styles.cornerImage}
      />

      <View style={styles.card}>
        <Text style={styles.welcomeText}>🧘‍♀️ Know Your Numbers</Text>

        <Text style={styles.label}>📏 How tall are you? (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 170"
          value={height.toString()}
          onChangeText={(text) => setHeight(Number(text))}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>⚖️ How much do you weigh? (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 65"
          value={weight.toString()}
          onChangeText={(text) => setWeight(Number(text))}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Sounds good, let’s go </Text>
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
    width: 90,
    height: 90,
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
    elevation: 6,
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
    borderColor: "#ccc",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
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

