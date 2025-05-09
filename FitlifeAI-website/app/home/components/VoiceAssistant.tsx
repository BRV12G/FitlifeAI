import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
} from "react-native";

const VoiceAssistantPromo = () => {
  const handleOpenAssistant = () => {
    Linking.openURL("https://fitlifeai-voice-assistant.vercel.app/");
  };

  const features = [
    {
      title: "🤖 Smart AI Assistant",
      description:
        "Have natural conversations about your fitness goals, health conditions, and preferences.",
    },
    {
      title: "💪 Personalized Workout Plans",
      description:
        "Custom routines based on your level, injuries, and fitness goals.",
    },
    {
      title: "🥗 Diet Recommendations",
      description:
        "Tailored meal plans that respect your allergies and dietary needs.",
    },
    {
      title: "📋 Program Management",
      description:
        "Manage multiple fitness programs—only the latest one stays active.",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Top-right image (e.g., mic icon) */}
        <Image
          source={require("@/assets/images/home-page/ch.png")} // Replace with your own image
          style={styles.topRightImage}
        />

        <Text style={styles.title}>🎙️ Meet FitLife AI Assistant</Text>
        <Text style={styles.subtitle}>
          Your smart fitness coach — talk, train, and transform.
        </Text>

        {features.map((feature, index) => (
          <View key={index} style={styles.featureBox}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureText}>{feature.description}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.ctaButton} onPress={handleOpenAssistant}>
          <Text style={styles.ctaButtonText}>Try the Voice Assistant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    position: "relative",
  },
  topRightImage: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  featureBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#2a5d9f",
  },
  featureText: {
    fontSize: 14,
    color: "#444",
  },
  ctaButton: {
    backgroundColor: "#3A7CA5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  ctaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default VoiceAssistantPromo;
