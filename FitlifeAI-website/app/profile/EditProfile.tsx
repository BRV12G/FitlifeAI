import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useUser } from '@/contexts/userContext';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
  const { userInfo, updateUserInfo } = useUser();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    username: userInfo.username,
    email: userInfo.email,
    age: userInfo.age,
    gender: userInfo.gender,
    occupation: userInfo.occupation,
    physicalActivity: userInfo.physicalActivity,
    sleepHours: String(userInfo.sleepHours),
    qualityOfSleep: String(userInfo.qualityOfSleep),
    stressLevel: String(userInfo.stressLevel),
    height: String(userInfo.height),
    weight: String(userInfo.weight),
    bmi: String(userInfo.bmi),
    bmiCategory: userInfo.bmiCategory,
    bloodPressureCategory: userInfo.bloodPressureCategory,
    systolicPressure: String(userInfo.systolicPressure),
    diastolicPressure: String(userInfo.diastolicPressure),
    heartrate: String(userInfo.heartrate),
    dailySteps: String(userInfo.dailySteps),
    sleepDisorder: userInfo.sleepDisorder,
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    const convertedData = {
      ...formData,
      sleepHours: parseFloat(formData.sleepHours),
      qualityOfSleep: parseFloat(formData.qualityOfSleep),
      stressLevel: parseFloat(formData.stressLevel),
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      bmi: parseFloat(formData.bmi),
      systolicPressure: parseFloat(formData.systolicPressure),
      diastolicPressure: parseFloat(formData.diastolicPressure),
      heartrate: parseFloat(formData.heartrate),
      dailySteps: parseInt(formData.dailySteps),
    };

    updateUserInfo(convertedData);
    Alert.alert('Success', 'Profile updated successfully');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.sectionTitle}>Basic Information</Text>
      {[
        'firstName',
        'lastName',
        'username',
        'email',
        'age',
        'gender',
        'occupation',
      ].map((key) => (
        <View key={key} style={styles.inputGroup}>
          <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1')}:</Text>
          <TextInput
            style={styles.input}
            value={formData[key]}
            onChangeText={(text) => handleChange(key as keyof typeof formData, text)}
          />
        </View>
      ))}

      <Text style={styles.sectionTitle}>Health & Lifestyle</Text>
      {[
        'physicalActivity',
        'sleepHours',
        'qualityOfSleep',
        'stressLevel',
        'height',
        'weight',
        'bmi',
        'bmiCategory',
        'bloodPressureCategory',
        'systolicPressure',
        'diastolicPressure',
        'heartrate',
        'dailySteps',
        'sleepDisorder',
      ].map((key) => (
        <View key={key} style={styles.inputGroup}>
          <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1')}:</Text>
          <TextInput
            style={styles.input}
            value={formData[key]}
            onChangeText={(text) => handleChange(key as keyof typeof formData, text)}
            keyboardType={
              ['sleepHours', 'qualityOfSleep', 'stressLevel', 'height', 'weight', 'bmi', 'systolicPressure', 'diastolicPressure', 'heartrate', 'dailySteps'].includes(
                key
              )
                ? 'numeric'
                : 'default'
            }
          />
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, styles.cancelButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#e6f0fa',
      padding: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#2980b9',
      marginBottom: 20,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2980b9',
      marginTop: 20,
      marginBottom: 10,
    },
    inputGroup: {
      marginBottom: 15,
    },
    label: {
      color: '#6ca0dc',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    input: {
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: '#1f3a93',
    },
    saveButton: {
      backgroundColor: '#1a73e8',
      padding: 12,
      borderRadius: 8,
      marginTop: 15,
    },
    cancelButton: {
      backgroundColor: '#4a90e2',
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '600',
    },
  });
  