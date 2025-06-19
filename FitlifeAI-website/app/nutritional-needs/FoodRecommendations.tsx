
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { axiosWithAuth } from "../utils/api";

const RecommendationScreen = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedBreakfast, setExpandedBreakfast] = useState(false);
  const [expandedLunch, setExpandedLunch] = useState(false);
  const [expandedDinner, setExpandedDinner] = useState(false);


  const fetchRecommendations = async () => {
    setLoading(true);
    try {
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

  const renderFood = (mealArray, expanded) => {
    const itemsToRender = expanded ? mealArray : mealArray.slice(0, 2);
    return itemsToRender.map((item, index) => (
      <LinearGradient
        key={index}
        colors={["#e0f7fa", "#b2ebf2"]}
        style={styles.foodCard}
      >
        {/* <Image source={{ uri: item.image_url }} style={styles.foodImage} /> */}
        <Text style={styles.foodName}>{item.name}</Text>
        <View style={styles.proteinContainer}><Image source={require('@/assets/nutritients/calories.png')} style={styles.proteinIcon}/><Text> Calories: {item.calories}</Text></View>
        <View style={styles.proteinContainer}><Image source={require('@/assets/nutritients/eggs.png')} style={styles.proteinIcon}/><Text> Protein: {item.protein}g</Text></View>
        <View style={styles.proteinContainer}><Image source={require('@/assets/nutritients/fats.png')} style={styles.proteinIcon}/><Text> Fat: {item.fat}g</Text></View>
        <View style={styles.proteinContainer}><Image source={require('@/assets/nutritients/carbs.png')} style={styles.proteinIcon}/><Text> Crabs: {item.carbs}g</Text></View>
      </LinearGradient>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Personalized Meal Plan</Text>
        <Text style={styles.subtitle}>
          Curated meals based on your health profile
        </Text>
      </View>
 <View style={styles.imageContainer}>
      <View style={styles.image}>
        <Image source={require('@/assets/nutritients/girl_eating.png')} style={styles.image} />
      </View>

      <TouchableOpacity style={styles.fetchButton} onPress={fetchRecommendations}>
        <Text style={styles.fetchButtonText}>🎯 Get My Recommendations</Text>
      </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#3A7CA5" style={{ marginTop: 20 }} />}

      {recommendations && (
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>
            📊 Your BMI: {recommendations.bmi} 
          </Text>
          <Text style={styles.bmiInfo}> Your BMI is in a <Text style={styles.bmiRange}>{recommendations.bmi_info}</Text> Range</Text>

          {/* Breakfast Section */}
          <View style={styles.proteinContainer}><Image source={require('@/assets/nutritients/breakfast.png')} style={styles.mealIcon}/><Text style={styles.mealTitle}> Breakfast</Text></View>

          <View style={styles.mealContainerBreakfast}>{renderFood(recommendations.breakfast, expandedBreakfast)}</View>
          {recommendations.breakfast.length > 2 && (
            <TouchableOpacity 
              style={styles.viewMoreButton} 
              onPress={() => setExpandedBreakfast(!expandedBreakfast)}
            >
              <Text style={styles.viewMoreText}>
                {expandedBreakfast ? "Hide options" : "View more options for Breakfast"}
              </Text>
            </TouchableOpacity>
          )}

          
          {/* Lunch Section */}
          <View style={styles.proteinContainer}><Image source={require('@/assets/nutritients/meal.png')} style={styles.mealIcon}/><Text style={styles.mealTitle}> Lunch</Text></View>
          <View style={styles.mealContainerBreakfast}>{renderFood(recommendations.lunch, expandedLunch)}</View>
          {recommendations.lunch.length > 2 && (
            <TouchableOpacity 
              style={styles.viewMoreButton} 
              onPress={() => setExpandedLunch(!expandedLunch)}
            >
              <Text style={styles.viewMoreText}>
                {expandedLunch ? "Hide options" : "View more options for Lunch"}
              </Text>
            </TouchableOpacity>
          )}

          
          {/* Dinner Section */}
          <View style={styles.proteinContainer}><Image source={require('@/assets/nutritients/dinner.png')} style={styles.mealIcon}/><Text style={styles.mealTitle}> Dinner</Text></View>

          <View style={styles.mealContainerBreakfast}>{renderFood(recommendations.dinner, expandedDinner)}</View>
          {recommendations.dinner.length > 2 && (
            <TouchableOpacity 
              style={styles.viewMoreButton} 
              onPress={() => setExpandedDinner(!expandedDinner)}
            >
              <Text style={styles.viewMoreText}>
                {expandedDinner ? "Hide options" : "View more options for Dinner"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9fcff",
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3A7CA5",
  },
  subtitle: {
    fontSize: 16,
    color: "#5f7e9c",
    textAlign: "center",
    marginTop: 6,
  },
  fetchButton: {
    backgroundColor: "#3A7CA5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    // marginVertical: 10,
  },
  fetchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d5061",
    marginBottom: 10,
    textAlign: "center",
  },
  mealTitle: {
    fontSize: 30,
    fontWeight: "700",
    marginVertical: 12,
    color: "#3A7CA5",
  },
  foodCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    // flexDirection: "column",
    // alignItems: "center",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    width: "45%",
    marginRight: "2.5%",
    
      },
  // foodImage: {
  //   width: "100%",
  //   height: 160,
  //   borderRadius: 10,
  //   marginBottom: 10,
  // },
  foodName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#2e3a59",
    justifyContent: "center",
    fontStyle: "italic",

  },
  bmiInfo: {
    fontSize: 24,
    color: "#5f7e9c",
    textAlign: "center",
    marginBottom: 5,
  },
  bmiRange: {
    fontWeight: "bold",
    color: "#3A7CA5",
  },
  mealContainerBreakfast: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  viewMoreButton: {
    marginBottom: 5,
    alignItems: "center",
    backgroundColor: "#3A7CA5",
    padding: 8,
    borderRadius: 8,
  },
  viewMoreText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  proteinIcon : {
    width: 20,
    height: 20,
    // marginRight: 8,
  },
  proteinContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    marginTop: 3,

  },
  mealIcon: {
    width: 30,
    height: 30,
    // marginRight: 8,
  },
  image: {
    width: 80,
    height: 140,
    borderRadius: 12,
    marginBottom: 10, 
  },
  imageContainer: {
    alignItems: "center",
    flexDirection: "row", width: "45%",
    justifyContent: "between",
    gap: "10%"
  },
});

export default RecommendationScreen;

