// // app/fitness/FitnessScreen.tsx
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   Button,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";
// import { axiosWithAuth } from "@/app/utils/api";

// const FitnessScreen = () => {
//   const [formData, setFormData] = useState({
//     injury: "",
//     workoutPreference: "",
//     goal: "",
//     weightGoal: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [recommendation, setRecommendation] = useState("");

//   const handleChange = (key: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setRecommendation("");

//     try {
//       const axiosInstance = await axiosWithAuth();
//       const response = await axiosInstance.post("/api/fitness/", formData);
//       setRecommendation(response.data.recommendation);
//     } catch (err: any) {
//       console.error(err);
//       setRecommendation("❌ Error fetching recommendation. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Fitness Recommendation Form</Text>

//       {Object.entries(formData).map(([key, value]) => (
//         <TextInput
//           key={key}
//           style={styles.input}
//           placeholder={key.replace(/([A-Z])/g, " $1")}
//           value={value}
//           onChangeText={(val) => handleChange(key, val)}
//         />
//       ))}

//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <Button title="Generate Recommendation" onPress={handleSubmit} />
//       )}

//       {recommendation !== "" && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>
//             Your Personalized Fitness Plan:
//           </Text>
//           <Text>{recommendation}</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginBottom: 12,
//     borderRadius: 6,
//   },
//   resultContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: "#eef",
//     borderRadius: 6,
//   },
//   resultTitle: { fontWeight: "bold", marginBottom: 8 },
// });

// export default FitnessScreen;












import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { axiosWithAuth } from "@/app/utils/api";

const FitnessScreen = () => {
  const [formData, setFormData] = useState({
    injury: "",
    workout_preference: "",
    goal: "",
    weight_goal: "",
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setRecommendation("");

    try {
      const axiosInstance = await axiosWithAuth();
      const response = await axiosInstance.post("/api/fitness/", formData);
      setRecommendation(response.data.recommendation);
    } catch (err: any) {
      console.error(err);
      setRecommendation("❌ Error fetching recommendation. Please try again.");
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "left", marginBottom: 20, gap: "1%", alignItems: "center", left:0 }}>
        <Image source={require('@/assets/fitness/girl4.png')} style={styles.Titleimage} />
        <Text style={styles.title}> Fitness Planner</Text>

      
      </View>
      <Text style={styles.subtitle}>
        Tell us your goals, and we’ll craft a custom workout plan for you!
      </Text>
      

      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20, gap: "1%"}}>
        <Image source={require('@/assets/fitness/girl2.png')} style={styles.image} />
                <Image source={require('@/assets/fitness/girl1.png')} style={styles.image} />
        <Image source={require('@/assets/fitness/girl3.png')} style={styles.image} />
      </View>

      {Object.entries(formData).map(([key, value]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.replace(/([A-Z])/g, " $1")}
          value={value}
          onChangeText={(val) => handleChange(key, val)}
          placeholderTextColor="#999"
        />
      ))}

      {loading ? (
        <ActivityIndicator size="large" color="#3A7CA5" />
      ) : (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Image source={require('@/assets/fitness/plan.png')} style={styles.GenerateImage}/>
          <Text style={styles.submitText}> Generate Plan</Text>
        </TouchableOpacity>
      )}

      {recommendation !== "" && (
        <LinearGradient colors={["#e0f7fa", "#b2ebf2"]} style={styles.resultBox}>
          <Text style={styles.resultTitle}> Your Fitness Plan</Text>
          <Text style={styles.resultText}>{recommendation}</Text>
        </LinearGradient>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9fcff",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#3A7CA5",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#5a7085",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: "#3A7CA5",
    padding: 4,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
  },
  resultBox: {
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007b8a",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 8,
    
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 40,
    // marginHorizontal: 5,
    // borderWidth: 2,
    // borderColor: "#3A7CA5",
  },
   Titleimage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "#3A7CA5",
  },
  GenerateImage: {
    width: 50,
    height: 50,
    // borderRadius: 40,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "#3A7CA5",
  },
});

export default FitnessScreen;

