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
import { axiosWithAuth } from "@/utils/api";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";

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
      console.log("Fitness response: ", response.data);
      setRecommendation(response.data.recommendation);
    } catch (err: any) {
      console.error(err);
      setRecommendation("❌ Error fetching recommendation. Please try again.");
    }

    setLoading(false);
  };

  function parseResponse(text: string) {
    // const sections = text.split(/\*\*\d\..*?\*\*/g).filter(Boolean);
    const titles = [
      "Personalized Plan",
      "Workout Frequency",
      "Recommended Exercises",
      "Weekly Schedule",
      "Precautions",
      "Predicted Goal Time",
    ];

    const regex = /\*\*(\d)\.\s(.*?)\*\*/g;
    const matches = [...text.matchAll(regex)];

    let parsed = [];

    for (let i = 0; i < matches.length; i++) {
      const currentMatch = matches[i];
      const nextMatch = matches[i + 1];
      const startIndex = currentMatch.index! + currentMatch[0].length;
      const endIndex = nextMatch ? nextMatch.index : text.length;

      const content = text.substring(startIndex, endIndex).trim();
      parsed.push({
        title: titles[i] || `Section ${i + 1}`,
        content: content,
      });
    }

    // sections.forEach((section, index) => {
    //   parsed.push({
    //     title: titles[index],
    //     content: section.trim()
    //   });
    // });

    return parsed;
  }

  // Icon mapping
  function getIcon(title: string) {
    switch (title) {
      case "Workout Frequency":
        return (
          <MaterialIcons name="calendar-today" size={24} color="#1e88e5" />
        );
      case "Recommended Exercises":
        return (
          <MaterialCommunityIcons name="dumbbell" size={24} color="#1e88e5" />
        );
      case "Weekly Schedule":
        return <FontAwesome5 name="clipboard-list" size={24} color="#1e88e5" />;
      case "Precautions":
        return <Ionicons name="warning" size={24} color="#e53935" />;
      case "Predicted Goal Time":
        return <MaterialIcons name="timer" size={24} color="#43a047" />;
      default:
        return <Ionicons name="information-circle" size={24} color="#1e88e5" />;
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "left",
          marginBottom: 20,
          gap: "1%",
          alignItems: "center",
          left: 0,
        }}
      >
        <Image
          source={require("@/assets/fitness/girl4.png")}
          style={styles.Titleimage}
        />
        <Text style={styles.title}> Fitness Planner</Text>
      </View>
      <Text style={styles.subtitle}>
        Tell us your goals, and we’ll craft a custom workout plan for you!
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
          gap: "1%",
        }}
      >
        <Image
          source={require("@/assets/fitness/girl2.png")}
          style={styles.image}
        />
        <Image
          source={require("@/assets/fitness/girl1.png")}
          style={styles.image}
        />
        <Image
          source={require("@/assets/fitness/girl3.png")}
          style={styles.image}
        />
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
          <Image
            source={require("@/assets/fitness/plan.png")}
            style={styles.GenerateImage}
          />
          <Text style={styles.submitText}> Generate Plan</Text>
        </TouchableOpacity>
      )}

      {recommendation !== "" && (
        <View style={styles.resultContainer}>
          {parseResponse(recommendation).map((section, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                {getIcon(section.title)}
                <Text style={styles.cardTitle}>{section.title}</Text>
              </View>
              <Markdown style={markdownStyles}>{section.content}</Markdown>{" "}
            </View>
          ))}
        </View>
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
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 20,
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
  resultContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3A7CA5",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e88e5",
    marginLeft: 10,
  },
  cardContent: {
    fontSize: 16,
    color: "#424242",
    lineHeight: 22,
  },
});

const markdownStyles = {
  text: {
    color: "#424242",
    fontSize: 16,
    lineHeight: 22,
  },
  strong: {
    fontWeight: "bold",
    color: "#000",
  },
  em: {
    fontStyle: "italic",
  },
  bullet_list: {
    marginVertical: 5,
  },
  list_item: {
    flexDirection: "row",
    marginVertical: 2,
  },
};

export default FitnessScreen;
