// HeroSection.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


const HeroSection = () => {
      const router = useRouter();
    
    const handleGetStarted = () => {
        // navigation.navigate('NavbarScreen');
        router.push('/home/components/NavbarScreen');
      };
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitLifeAI</Text>
      <Text style={styles.subtitle}>Your AI-Powered Healthy-life Companion</Text>
      <Image
        source={require('@/assets/images/home-page/GIRLL.png')} // Replace with your actual image path
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
    // <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/signUp')} >
    //         <Text style={styles.buttonText}>Sign up</Text>
    //       </TouchableOpacity>
  );
};

export default HeroSection;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#3A7CA5',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3A7CA5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
