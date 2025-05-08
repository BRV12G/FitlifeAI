// app/fitness/FitnessScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { axiosWithAuth } from "@/app/utils/api";

const FitnessScreen = () => {
  const [formData, setFormData] = useState({
    injury: "",
    workoutPreference: "",
    goal: "",
    weightGoal: "",
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
      <Text style={styles.title}>Fitness Recommendation Form</Text>

      {Object.entries(formData).map(([key, value]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.replace(/([A-Z])/g, " $1")}
          value={value}
          onChangeText={(val) => handleChange(key, val)}
        />
      ))}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Generate Recommendation" onPress={handleSubmit} />
      )}

      {recommendation !== "" && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>
            Your Personalized Fitness Plan:
          </Text>
          <Text>{recommendation}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#eef",
    borderRadius: 6,
  },
  resultTitle: { fontWeight: "bold", marginBottom: 8 },
});

export default FitnessScreen;
