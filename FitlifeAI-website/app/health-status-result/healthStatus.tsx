import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useUser } from "../contexts/userContext";

const HealthStatus = () => {
  const { userInfo } = useUser();

  const renderStatus = (label: string, condition: boolean, message: string) => (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={condition ? styles.good : styles.bad}>{message}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Health Status Overview</Text>
      <Text style ={styles.result}>Healthy/Unhealthy</Text>


      {renderStatus(
        "BMI",
        userInfo.bmiCategory === "Normal weight",
        `Your BMI is ${userInfo.bmi} (${userInfo.bmiCategory}).`
      )}

      {renderStatus(
        "Blood Pressure",
        userInfo.bloodPressureCategory === "Normal",
        `Your Blood Pressure is ${userInfo.systolicPressure}/${userInfo.diastolicPressure} (${userInfo.bloodPressureCategory}).`
      )}

      {renderStatus(
        "Heart Rate",
        userInfo.heartrate >= 60 && userInfo.heartrate <= 100,
        `Your Heart Rate is ${userInfo.heartrate} bpm. This is considered ${userInfo.heartrate >= 60 && userInfo.heartrate <= 100 ? "normal" : "out of normal range"}.`
      )}

      {renderStatus(
        "Sleep Hours",
        userInfo.sleepHours >= 7 && userInfo.sleepHours <= 9,
        `You sleep ${userInfo.sleepHours} hours per day. ${userInfo.sleepHours >= 7 && userInfo.sleepHours <= 9 ? "That's within the recommended range." : "Consider adjusting your sleep schedule."}`
      )}

      {renderStatus(
        "Sleep Quality",
        userInfo.qualityOfSleep >= 7,
        `Your Sleep Quality score is ${userInfo.qualityOfSleep}/10. ${userInfo.qualityOfSleep >= 7 ? "That's a good sleep quality." : "You may want to improve your sleep environment or habits."}`
      )}

      {renderStatus(
        "Stress Level",
        userInfo.stressLevel <= 3,
        `Your stress level is ${userInfo.stressLevel}/10. ${userInfo.stressLevel <= 3 ? "You're managing stress well." : "Try stress-reduction techniques like meditation or exercise."}`
      )}

      {renderStatus(
        "Daily Steps",
        userInfo.dailySteps >= 7000,
        `You walk ${userInfo.dailySteps} steps daily. ${userInfo.dailySteps >= 7000 ? "Great job staying active!" : "Consider adding more walking into your daily routine."}`
      )}

      {renderStatus(
        "Sleep Disorder",
        userInfo.sleepDisorder === "None" || userInfo.sleepDisorder === "",
        userInfo.sleepDisorder ? `You reported a sleep disorder: ${userInfo.sleepDisorder}. Consider consulting a specialist.` : "No sleep disorders reported."
      )}
    </ScrollView>
  );
};

export default HealthStatus;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f9ff",
    padding: 16,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3A7CA5",
    marginBottom: 16,
    textAlign: "center",
  },
  statusSummary: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  healthy: {
    color: "#28a745",
  },
  unhealthy: {
    color: "#d9534f",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  good: {
    color: "#28a745",
  },
  bad: {
    color: "#d9534f",
  },
  result: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    // color: "#333",
    textAlign: "center",
    backgroundColor: "#3A7CA5",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
  },
});