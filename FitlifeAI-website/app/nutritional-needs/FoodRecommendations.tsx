import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { axiosWithAuth } from "../utils/api";

const RecommendationScreen = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      //   const response = await axios.get('http://<your-backend-ip>:8000/api/get-recommendations/', {
      //     headers: {
      //       Authorization: `Token YOUR_AUTH_TOKEN_HERE`,
      //     },
      //   });

      const api = await axiosWithAuth();
      const response = await api.get("/api/recommendations");
      setRecommendations(response.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("Error fetching recommendations");
    } finally {
      setLoading(false);
    }
  };

  const renderFood = (mealArray) => {
    return mealArray.map((item, index) => (
      <View key={index} style={styles.foodCard}>
        <Image source={{ uri: item.image_url }} style={styles.foodImage} />
        <Text style={styles.foodName}>{item.name}</Text>
        <Text>Calories: {item.calories}</Text>
        <Text>Protein: {item.protein}g</Text>
        <Text>Fat: {item.fat}g</Text>
        <Text>Carbs: {item.carbs}g</Text>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Button title="Get Recommendations" onPress={fetchRecommendations} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {recommendations && (
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>
            BMI: {recommendations.bmi} ({recommendations.bmi_info})
          </Text>

          <Text style={styles.sectionTitle}>Breakfast</Text>
          {renderFood(recommendations.breakfast)}

          <Text style={styles.sectionTitle}>Lunch</Text>
          {renderFood(recommendations.lunch)}

          <Text style={styles.sectionTitle}>Dinner</Text>
          {renderFood(recommendations.dinner)}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  resultSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  foodCard: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  foodImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default RecommendationScreen;
