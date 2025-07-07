import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useUser } from "../../contexts/userContext";
import { Router, useRouter } from "expo-router";
import { axiosWithAuth } from "../../utils/api";
import LogoutButton from "./LogoutButton";
// import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{userInfo.user.username}'s Profile</Text>

      <View style={styles.topSection}>
        <View style={styles.details}>
          <Text style={styles.sectionTitle}>Profile Summary</Text>

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
        <TouchableOpacity style={[ styles.secondaryButton]}>
          <LogoutButton />
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.sectionTitle}>Health Information</Text> */}

      {/* <View style={styles.healthInfoSection}> */}
        {/* <Image
          source={require("@/assets/images/profile/girl1.png")}
          style={styles.avatar2}
        /> */}
        <View style={styles.healthInfo}>
          <Text style={styles.sectionTitle}>Health Information</Text>

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
            Daily Steps:{" "}
            <Text style={styles.value}>{userInfo.daily_steps}</Text>
          </Text>
          <Text style={styles.label}>
            Sleep Disorder:{" "}
            <Text style={styles.value}>{userInfo.sleep_disorder}</Text>
          </Text>
        </View>
      </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f0fa",
    padding: 2,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2980b9",
    textAlign: "center",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    //   marginBottom: 2,
    // marginTop: 20,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  avatar: {
    width: 160,
    height: 250,
    borderRadius: 16,
    // borderWidth: 2,
    // borderColor: "#6ca0dc",
    //   resizeMode: 'contain',
    //   marginRight: 1,
  },
  details: {
    flex: 1,
    flexShrink: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  healthInfo: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 30,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#6ca0dc",
    fontSize: 16,
  },
  value: {
    fontWeight: "400",
    color: "#1f3a93",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1a73e8",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    width: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: "#DC143C",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    width: "70%",
    // shadowColor: "#000",

  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2980b9",
    // marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  healthInfoSection: {
    // flexDirection: "row",
    // alignItems: "flex-",
    marginBottom: 2,
    marginTop: 10,
    flexWrap: "wrap",
    gap: 5,
  },
  avatar2: {
    width: 130,
    height: 250,
    // marginRight: 10,
    marginLeft: 0,
    // borderRadius: 16,
    // borderWidth: 2,
    // borderColor: "#6ca0dc",
    //   resizeMode: 'contain',
    //   marginRight: 1,
  },
});
