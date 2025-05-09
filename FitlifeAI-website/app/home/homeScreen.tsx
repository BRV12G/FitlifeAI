// HomePage.js
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import HeroSection from '@/app/home/components/heroSection';
import CoreFeatures from './components/features';
import VoiceAssistantPromo from './components/VoiceAssistant';

// tip of the day
//accordian for faqs 
// how it works

const HomePage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <HeroSection />

        <CoreFeatures />
        <VoiceAssistantPromo />


        {/* Add more components below, like features, testimonials, etc. */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingBottom: 40,
  },
});
