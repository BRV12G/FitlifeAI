import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const HealthStatusScreen = () => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Health Status</Text>
        <Text>Healthy / Unhealthy</Text>
        <View>
            <Text>Health Report</Text>
        </View>
      </ScrollView>
    );
  };
  export default HealthStatusScreen;


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