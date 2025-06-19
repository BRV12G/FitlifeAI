import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useUser } from "../../contexts/userContext";
import { Router, useRouter } from "expo-router";
import { axiosWithAuth } from "../utils/api";

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const api = await axiosWithAuth();
        const response = await api.get("/api/user-profile/");
        console.log(response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load user profile.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userInfo.user.username}'s Profile</Text>

      <View style={styles.topSection}>
        <View style={styles.details}>
          <Text style={styles.label}>
            Name:{" "}
            <Text style={styles.value}>
              {userInfo.user.first_name} {userInfo.user.last_name}
            </Text>
          </Text>
          <Text style={styles.label}>
            Username: <Text style={styles.value}>{userInfo.user.username}</Text>
          </Text>
          <Text style={styles.label}>
            Email: <Text style={styles.value}>{userInfo.user.email}</Text>
          </Text>
          <Text style={styles.label}>
            Age: <Text style={styles.value}>{userInfo.age}</Text>
          </Text>
          <Text style={styles.label}>
            Gender: <Text style={styles.value}>{userInfo.gender}</Text>
          </Text>
          <Text style={styles.label}>
            Occupation: <Text style={styles.value}>{userInfo.occupation}</Text>
          </Text>
        </View>
        <Image
          source={require("@/assets/images/profile/girl2.png")}
          style={styles.avatar}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => route.push("/profile/EditProfile")}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.healthInfo}>
        <Text style={styles.label}>
          Height: <Text style={styles.value}>{userInfo.height}</Text>
        </Text>
        <Text style={styles.label}>
          Weight: <Text style={styles.value}>{userInfo.weight}</Text>
        </Text>
        <Text style={styles.label}>
          BMI: <Text style={styles.value}>{userInfo.bmi}</Text>
        </Text>
        <Text style={styles.label}>
          Blood Pressure:{" "}
          <Text style={styles.value}>{userInfo.bp_category}</Text>
        </Text>
        <Text style={styles.label}>
          Heart Rate: <Text style={styles.value}>{userInfo.heart_rate}</Text>
        </Text>
        <Text style={styles.label}>
          Daily Steps: <Text style={styles.value}>{userInfo.daily_steps}</Text>
        </Text>
        <Text style={styles.label}>
          Sleep Disorder:{" "}
          <Text style={styles.value}>{userInfo.sleep_disorder}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f0fa",
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    //   marginBottom: 20,
    color: "#2980b9",
    textAlign: "center",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    //   marginBottom: 2,
    marginTop: 20,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  avatar: {
    width: 160,
    height: 250,
    //   resizeMode: 'contain',
    //   marginRight: 1,
  },
  details: {
    flex: 1,
    flexShrink: 1,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "#6ca0dc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  healthInfo: {
    marginTop: 20,
    marginBottom: 5,
    borderColor: "#6ca0dc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
    color: "#6ca0dc",
  },
  value: {
    fontWeight: "normal",
    color: "#1f3a93",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1a73e8",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: "50%",
  },
  secondaryButton: {
    backgroundColor: "#4a90e2",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
