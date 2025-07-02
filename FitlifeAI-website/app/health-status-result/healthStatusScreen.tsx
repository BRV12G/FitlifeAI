import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { axiosWithAuth } from "../../utils/api"; // assumes you have axios setup
import { useUser } from "../../contexts/userContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HealthStatus = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUser();

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        const axiosInstance = await axiosWithAuth();
        const response = await axiosInstance.get("/api/predict-health/");
        setHealthData(response.data);
      } catch (err) {
        console.error("Error fetching health data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHealthStatus();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#3A7CA5" />
    );
  }

  if (!healthData) {
    return <Text style={styles.error}>Failed to load health data.</Text>;
  }

  const renderCard = (label: string, value: string | number, icon: string) => (
    <View style={styles.card} key={label}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Health Prediction Overview</Text>
      <Text style={styles.result}>{healthData.health_status}</Text>

      {renderCard("BMI Class", healthData.bmi_class)}
      {renderCard("BMI Value", `${healthData.bmi_value} kg/m²`)}

      {renderCard("Calories", `${healthData.calories} kcal`)}
      {renderCard("Carbohydrates", `${healthData.carbohydrates} g`)}
      {renderCard("Proteins", `${healthData.proteins} g`)}
      {renderCard("Fats", `${healthData.fats} g`)}

      {renderCard("Vitamin A", `${healthData.vitamin_a} mcg`)}
      {renderCard("Vitamin C", `${healthData.vitamin_c} mg`)}
      {renderCard("Vitamin D", `${healthData.vitamin_d} mcg`)}

      {renderCard("Sodium", `${healthData.sodium} mg`)}
      {renderCard("Potassium", `${healthData.potassium} mg`)}
      {renderCard("Magnesium", `${healthData.magnesium} mg`)}
      {renderCard("Iron", `${healthData.iron} mg`)}
      {renderCard("Zinc", `${healthData.zinc} mg`)}

      {renderCard("Fiber Intake", `${healthData.fiber} g`)}
      {renderCard("Water Intake", `${healthData.water} L`)}
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
    // marginTop: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3A7CA5",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#3A7CA5",
    // paddingRight: 35,
    width: "48%",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 1,
    top: -10,
  },
  cardLabel: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#333",
  },
  cardValue: {
    fontSize: 16,
    color: "#555",
    marginLeft: 28,
    fontWeight: "500",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 50,
  },
});
