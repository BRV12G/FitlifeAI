import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";

const BMICalculator = () => {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const calculateBMI = () => {
    if (!weight || !height) {
      alert("Please enter both weight and height");
      return;
    }

    const heightInMeters = height / 100;
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    setBMI(calculatedBMI);

    if (calculatedBMI < 18.5) {
      setCategory("Underweight");
      setMessage(
        "You are underweight. Consider a balanced diet and strength training. Try our FitLife AI voice assistant or nutrition system to improve your health."
      );
    } else if (calculatedBMI < 25) {
      setCategory("Normal weight");
      setMessage(
        "Great job! You are at a healthy weight. Maintain your fitness with personalized workouts via our FitLife AI assistant."
      );
    } else if (calculatedBMI < 30) {
      setCategory("Overweight");
      setMessage(
        "You are slightly overweight. Try our FitLife diet recommendations or voice assistant for a healthier routine."
      );
    } else {
      setCategory("Obese");
      setMessage(
        "Your BMI suggests obesity. You need to work on yourself. Use our FitLife AI voice assistant or diet recommendation system for a healthy lifestyle."
      );
    }
  };

  const openFitLife = () => {
    Linking.openURL("https://fitlifeai-voice-assistant.vercel.app/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      <Text style={styles.label}>Enter your weight (kg):</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight in kg"
        keyboardType="numeric"
        onChangeText={(text) => setWeight(Number(text))}
      />

      <Text style={styles.label}>Enter your height (cm):</Text>
      <TextInput
        style={styles.input}
        placeholder="Height in cm"
        keyboardType="numeric"
        onChangeText={(text) => setHeight(Number(text))}
      />

      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Calculate BMI</Text>
      </TouchableOpacity>

      {bmi && (
        <View style={styles.resultBox}>
          <Text style={styles.result}>Your BMI is: {bmi.toFixed(1)}</Text>
          <Text style={styles.category}>Category: {category}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={styles.ctaButton} onPress={openFitLife}>
            <Text style={styles.ctaText}>Explore FitLife Assistant</Text>
          </TouchableOpacity>
          
        </View>
      )}
    </View>
  );
};

export default BMICalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6fc",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#3A7CA5",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#3A7CA5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultBox: {
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  result: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3A7CA5",
  },
  category: {
    fontSize: 16,
    marginTop: 8,
    color: "#444",
    fontWeight: "600",
  },
  message: {
    fontSize: 15,
    marginTop: 12,
    textAlign: "center",
    color: "#666",
  },
  ctaButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#5DA9E9",
    borderRadius: 8,
  },
  ctaText: {
    color: "#fff",
    fontWeight: "600",
  },
});
