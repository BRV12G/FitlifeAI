
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { useUser } from "../../contexts/userContext";
// import { useNavigation } from "@react-navigation/native";
// import { axiosWithAuth } from "../../utils/api";
// import axios from "axios";
// import { Picker } from "@react-native-picker/picker"; // 

// const EditProfileScreen = () => {
//   const navigation = useNavigation();
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     email: "",
//     age: "",
//     gender: "",
//     occupation: "",
//     physical_activity: "",
//     sleep_hours: "",
//     quality_of_sleep: "",
//     stress_level: "",
//     height: "",
//     weight: "",
//     bmi: "",
//     bmi_category: "",
//     bp_category: "",
//     systolic_pressure: "",
//     diastolic_pressure: "",
//     heart_rate: "",
//     daily_steps: "",
//     sleep_disorder: "",
//   });

//   const fetchUserData = async () => {
//     try {
//       const api = await axiosWithAuth();
//       const response = await api.get("/api/edit-userprofile/");
//       const userInfo = response.data;
//       console.log(userInfo);
//       setFormData({
//         first_name: userInfo.user.first_name || "",
//         last_name: userInfo.user.last_name || "",
//         username: userInfo.user.username || "",
//         email: userInfo.user.email || "",
//         age: String(userInfo.age || ""),
//         gender: userInfo.gender || "",
//         occupation: userInfo.occupation || "",
//         physical_activity: userInfo.physical_activity || "",
//         sleep_hours: String(userInfo.sleep_hours || ""),
//         quality_of_sleep: String(userInfo.quality_of_sleep || ""),
//         stress_level: String(userInfo.stress_level || ""),
//         height: String(userInfo.height || ""),
//         weight: String(userInfo.weight || ""),
//         bmi: String(userInfo.bmi || ""),
//         bmi_category: userInfo.bmi_category || "",
//         bp_category: userInfo.bp_category || "",
//         systolic_pressure: String(userInfo.systolic || ""),
//         diastolic_pressure: String(userInfo.diastolic || ""),
//         heart_rate: String(userInfo.heart_rate || ""),
//         daily_steps: String(userInfo.daily_steps || ""),
//         sleep_disorder: userInfo.sleep_disorder || "",
//       });
//     } catch (error) {
//       console.error("Error fetching user data", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const convertedData = {
//         ...formData,
//         age: parseInt(formData.age),
//         sleep_hours: parseFloat(formData.sleep_hours),
//         quality_of_sleep: parseFloat(formData.quality_of_sleep),
//         stress_level: parseFloat(formData.stress_level),
//         height: parseFloat(formData.height),
//         weight: parseFloat(formData.weight),
//         bmi: parseFloat(formData.bmi),
//         systolic_pressure: parseFloat(formData.systolic_pressure),
//         diastolic_pressure: parseFloat(formData.diastolic_pressure),
//         heart_rate: parseFloat(formData.heart_rate),
//         daily_steps: parseInt(formData.daily_steps),
//       };
//       const api = await axiosWithAuth();
//       await api.put("/api/edit-userprofile/", convertedData);
//       Alert.alert("Success", "Profile updated successfully");
//       navigation.goBack();
//     } catch (error) {
//       console.error("Update failed", error);
//       Alert.alert("Error", "Failed to update profile");
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Edit Profile</Text>
//       {Object.entries(formData).map(([key, value]) => (
//         <View key={key} style={styles.inputGroup}>
//           <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1")}</Text>
//           <TextInput
//             style={styles.input}
//             value={value}
//             onChangeText={(text) => handleChange(key, text)}
//           />
//         </View>
//       ))}
//       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//         <Text style={styles.buttonText}>Save Changes</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default EditProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#e6f0fa",
//     padding: 20,
//     // paddingBottom: 40,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#2980b9",
//     // marginBottom: 20,
//     textAlign: "center",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#2980b9",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     color: "#6ca0dc",
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   input: {
//     backgroundColor: "#fff",
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     color: "#1f3a93",
//   },
//   saveButton: {
//     backgroundColor: "#1a73e8",
//     padding: 12,
//     borderRadius: 8,
//     // marginTop: 15,
//     marginBottom: 30,
//   },
//   cancelButton: {
//     backgroundColor: "#4a90e2",
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // ✅ CHANGED: Imported Picker
import { useUser } from "../../contexts/userContext";
import { useNavigation } from "@react-navigation/native";
import { axiosWithAuth } from "../../utils/api";
import axios from "axios";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    age: "",
    gender: "",
    occupation: "",
    physical_activity: "",
    sleep_hours: "",
    quality_of_sleep: "",
    stress_level: "",
    height: "",
    weight: "",
    bmi: "",
    bmi_category: "",
    bp_category: "",
    systolic_pressure: "",
    diastolic_pressure: "",
    heart_rate: "",
    daily_steps: "",
    sleep_disorder: "",
  });

  const fetchUserData = async () => {
    try {
      const api = await axiosWithAuth();
      const response = await api.get("/api/edit-userprofile/");
      const userInfo = response.data;
      console.log(userInfo);
      setFormData({
        first_name: userInfo.user.first_name || "",
        last_name: userInfo.user.last_name || "",
        username: userInfo.user.username || "",
        email: userInfo.user.email || "",
        age: String(userInfo.age || ""),
        gender: userInfo.gender || "",
        occupation: userInfo.occupation || "",
        physical_activity: userInfo.physical_activity || "",
        sleep_hours: String(userInfo.sleep_hours || ""),
        quality_of_sleep: String(userInfo.quality_of_sleep || ""),
        stress_level: String(userInfo.stress_level || ""),
        height: String(userInfo.height || ""),
        weight: String(userInfo.weight || ""),
        bmi: String(userInfo.bmi || ""),
        bmi_category: userInfo.bmi_category || "",
        bp_category: userInfo.bp_category || "",
        systolic_pressure: String(userInfo.systolic || ""),
        diastolic_pressure: String(userInfo.diastolic || ""),
        heart_rate: String(userInfo.heart_rate || ""),
        daily_steps: String(userInfo.daily_steps || ""),
        sleep_disorder: userInfo.sleep_disorder || "",
      });
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const convertedData = {
        ...formData,
        age: parseInt(formData.age),
        sleep_hours: parseFloat(formData.sleep_hours),
        quality_of_sleep: parseFloat(formData.quality_of_sleep),
        stress_level: parseFloat(formData.stress_level),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        bmi: parseFloat(formData.bmi),
        systolic_pressure: parseFloat(formData.systolic_pressure),
        diastolic_pressure: parseFloat(formData.diastolic_pressure),
        heart_rate: parseFloat(formData.heart_rate),
        daily_steps: parseInt(formData.daily_steps),
      };
      const api = await axiosWithAuth();
      await api.put("/api/edit-userprofile/", convertedData);
      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Update failed", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      {Object.entries(formData).map(([key, value]) => {
        // ✅ CHANGED: Render dropdowns for specific fields
        if (key === "gender") {
          return (
            <View key={key} style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <Picker
                selectedValue={value}
                onValueChange={(val) => handleChange(key, val)}
                style={styles.picker}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Prefer not to say" value="prefer_not_to_say" />
              </Picker>
            </View>
          );
        }

        if (key === "physical_activity") {
          return (
            <View key={key} style={styles.inputGroup}>
              <Text style={styles.label}>Physical Activity</Text>
              <Picker
                selectedValue={value}
                onValueChange={(val) => handleChange(key, val)}
                style={styles.picker}
              >
                <Picker.Item label="Low" value="low" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="High" value="high" />
              </Picker>
            </View>
          );
        }

        if (key === "bp_category") {
          return (
            <View key={key} style={styles.inputGroup}>
              <Text style={styles.label}>BP Category</Text>
              <Picker
                selectedValue={value}
                onValueChange={(val) => handleChange(key, val)}
                style={styles.picker}
              >
                <Picker.Item label="Normal" value="Normal" />
                <Picker.Item label="Prehypertension" value="Prehypertension" />
                <Picker.Item label="Hypertension" value="Hypertension" />
              </Picker>
            </View>
          );
        }

        if (key === "sleep_disorder") {
          return (
            <View key={key} style={styles.inputGroup}>
              <Text style={styles.label}>Sleep Disorder</Text>
              <Picker
                selectedValue={value}
                onValueChange={(val) => handleChange(key, val)}
                style={styles.picker}
              >
                <Picker.Item label="None" value="none" />
                <Picker.Item label="Insomnia" value="insomnia" />
                <Picker.Item label="Sleep Apnea" value="sleep_apnea" />
                <Picker.Item label="Narcolepsy" value="narcolepsy" />
              </Picker>
            </View>
          );
        }

        // Default TextInput for all other fields
        return (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>{key.replace(/_/g, " ")}</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={(text) => handleChange(key, text)}
            />
          </View>
        );
      })}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6f0fa",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2980b9",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "#6ca0dc",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#1f3a93",
  },
  picker: {
    backgroundColor: "#fff", // ✅ CHANGED: Picker styling
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#1f3a93",
  },
  saveButton: {
    backgroundColor: "#1a73e8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});

