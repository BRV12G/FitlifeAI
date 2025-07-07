import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import {  usePathname  } from 'expo-router';
import ChatbotIcon from '../assets/Footer-svg/chatbot.svg';
import NutritionIcon from '../assets/Footer-svg/nutrition.svg';
import HomeIcon from '../assets/Footer-svg/home.svg';
import FitnessIcon from '../assets/Footer-svg/exercise.svg';
import ProfileIcon from '../assets/Footer-svg/profile.svg';


const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const hiddenRoutes = ['/', '/auth/login', '/auth/signUp'];

  if (hiddenRoutes.includes(pathname)) return null;

  const tabs = [
    {
      label: 'VoiceAgent',
      icon: require('../assets/Footer-svg/chatbot.png'),
      external: true,
      url: 'https://fitlifeai-voice-assistant.vercel.app/',

    },
    {
      label: 'Nutrition',
      icon: require('../assets/Footer-svg/nutrition.png'),
      route: '/nutritional-needs/FoodRecommendations',
    },
    {
      label: 'Home',
      icon: require('../assets/Footer-svg/home.png'),
      route: '/home/homeScreen',
    },
    {
      label: 'Fitness',
      icon: require('../assets/Footer-svg/exercise.png'),
      route: '/fitness/fitnessrecs',
    },
    {
      label: 'Profile',
      icon: require('../assets/Footer-svg/profile.png'),
      route: '/profile/profileScreen',
    },
  ];


  const handlePress = (tab: any) => {
    if (tab.external) {
      Linking.openURL(tab.url);
    } else {
      router.push(tab.route as RelativePathString);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          // onPress={() => router.push(tab.route as RelativePathString)}
          onPress={() => handlePress(tab)}

        >
          <Image source={tab.icon} style={styles.icon} resizeMode="contain" />
          <Text style={styles.label}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#2E6D9C',
  },
});
