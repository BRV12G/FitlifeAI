import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Link } from 'expo-router';

const sections = [
  { title: 'Check Your Health Status', route: '/health-status-result/healthStatusScreen' },
  { title: 'Checkout Your Nutritional Needs', route: '/nutritional-needs/NutritionCalculatorScreen' },
  { title: 'Checkout Your Fitness Needs and Routine', route: '/fitness/fitnessrecs' },
//   { title: 'Chat with Your AI-Bot', route: '/chatbot' },
  { title: 'Plan a Diet', route: '/nutritional-needs/FoodRecommendations' },
  { title: 'Calculate Your BMI', route: '/bmi/BmiCalculator' },
  { title: 'Calculate Your Body Fat Percentage', route: '/body-fat-calculator/BodyFatCalculator' },
    // { title: 'Plan A diet', route: '/dite-planner/dite-planner' },

];

const externalLink = 'https://fitlifeai-voice-assistant.vercel.app/';

const NavbarScreen = () => {
  const openExternalLink = () => {
    Linking.openURL(externalLink);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Welcome to FitLifeAI</Text>

      {sections.map((section, index) => (
        <Link href={section.route} key={index} style={styles.card} asChild>
          <View>
            <Text style={styles.cardText}>{section.title}</Text>
          </View>
        </Link>
      ))}

      {/* External Voice Assistant Link */}
      <TouchableOpacity style={styles.card} onPress={openExternalLink}>
        <Text style={styles.cardText}> Talk with Your FitLifeAI Voice Assistant</Text>
      </TouchableOpacity>

      <Image source={require('@/assets/images/home-page/girl2.png')} style={styles.imagegirl} />
    </ScrollView>
  );
};

export default NavbarScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3A7CA5',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3A7CA5',
  },
  imagegirl: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    // marginTop: 20,
  },
});
