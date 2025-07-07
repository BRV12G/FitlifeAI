// CoreFeatures.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const features = [
  {
    id: '1',
    title: 'AI Voice Assistant',
    description: 'Get a plan generated from your fitness assistant.',
    icon: require('@/assets/images/home-page/chatbot.png'),
  },
  {
    id: '2',
    title: 'Nutrition Recommendations',
    description: 'Suggestions based on your goals and body data.',
    icon: require('@/assets/images/home-page/nutrients.png'),
  },
  {
    id: '3',
    title: 'Diet Plans',
    description: 'Custom diet plans to help you eat smarter and healthier.',
    icon: require('@/assets/images/home-page/diet_plate.png'),
  },
  {
    id: '4',
    title: 'Workout Plans',
    description: 'Tailored workout routines based on your fitness level and goals.',
    icon: require('@/assets/images/home-page/workout.png'),
  },
  {
    id: '5',
    title: 'Health Status',
    description: 'Track your overall wellness using AI-powered insights.',
    icon: require('@/assets/images/home-page/health-status.png'),
  },
  {
    id: '6',
    title: 'BMI & Body Fat Calculator',
    description: 'Instantly calculate and analyze your body composition.',
    icon: require('@/assets/images/home-page/bmi.png'),
  },
];

const CoreFeatures = () => {
  const renderItem = ({ item }) => (
    <View style={styles.featureCard}>
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.featureTitle}>{item.title}</Text>
      <Text style={styles.featureDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Core Features</Text>
      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        scrollEnabled={false}
      />
    </View>
  );
};

export default CoreFeatures;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#3A7CA5',
  },
  list: {
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 13,
    textAlign: 'center',
    color: '#666',
  },
});
