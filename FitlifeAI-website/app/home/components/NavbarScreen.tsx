// app/home/components/NavbarScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const sections = [
  { title: 'Check Your Health Status', route: '/health-status-result/healthStatus' },
  { title: 'Checkout Your Nutritional Needs', route: '/nutritional-needs/Nutrition' },
  { title: 'Checkout Your Fitness Needs and Routine', route: '/fitness-routine' },
  { title: 'Chat with Your AI-Bot', route: '/chatbot' },
  { title: 'Plan a Diet', route: '/diet-planner' },
  { title: 'Calculate Your BMI', route: '/bmi-calculator' },
  { title: 'Calculate Your Body Fat Percentage', route: '/body-fat-calculator' },
];

const NavbarScreen = () => {
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
    color: '#1E1E1E',
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
});
