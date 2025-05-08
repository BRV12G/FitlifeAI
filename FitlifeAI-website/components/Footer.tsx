import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import {  usePathname  } from 'expo-router';

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const hiddenRoutes = ['/', '/auth/login', '/auth/signUp'];

  if (hiddenRoutes.includes(pathname)) return null;

  const tabs = [
    {
      label: 'ChatBot',
      icon: require('../assets/Footer-svg/chatbot.svg'),
      route: '/chatbot',
    },
    {
      label: 'Nutrition',
      icon: require('../assets/Footer-svg/nutrition.svg'),
      route: '/nutritional-needs/FoodRecommendations',
    },
    {
      label: 'Home',
      icon: require('../assets/Footer-svg/home.svg'),
      route: '/home/homeScreen',
    },
    {
      label: 'Fitness',
      icon: require('../assets/Footer-svg/exercise.svg'),
      route: '/fitness',
    },
    {
      label: 'Profile',
      icon: require('../assets/Footer-svg/profile.svg'),
      route: '/profile/profileScreen',
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => router.push(tab.route as RelativePathString)}
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
