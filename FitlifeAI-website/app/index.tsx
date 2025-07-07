import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
export default function HomeLayout(): JSX.Element {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top background wave */}
      <Image
        source={require("@/assets/images/home-page/wave.png")}
        style={styles.wave}
      />

      {/* Images */}
      <View style={styles.imageRow}>
        <Image
          source={require("@/assets/images/home-page/girl.png")}
          style={styles.girl}
        />
        <Image
          source={require("@/assets/images/home-page/heart.png")}
          style={styles.heart}
        />
      </View>

      {/* Title */}
      <Text style={styles.heading}>
        Stay on Track{"\n"}with {"\n"}
        <Text style={[styles.heading, styles.bold]}>FitLife-AI</Text>
      </Text>

      <Text style={styles.subtitle}>
        Your all-in-one health{"\n"}
        companion for fitness, nutrition,{"\n"}
        and well-being.
      </Text>

      {/* Bottom wave */}
      {/* <View style={styles.bottomWave} /> */}
      <Image
        source={require("@/assets/images/home-page/Bottom_wave_1.png")}
        style={styles.bottomWave1}
      />
      <Image
        source={require("@/assets/images/home-page/Bottom_wave_2.png")}
        style={styles.bottomWave2}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/signUp")}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    backgroundColor: "#F5FAFF",
  },

  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // gap: 2,
    marginTop: 80,
    marginBottom: 2,
  },
  girl: {
    width: 80,
    height: 250,
  },
  heart: {
    width: 240,
    height: 240,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    color: "#004E92",
    // marginBottom: 8,
    lineHeight: 30,
  },
  bold: {
    fontWeight: "900",
    color: "#004E92",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#4A6FA5",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#F5FAFF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 12,
    width: "80%",
    elevation: 2,
  },
  buttonContainer: {
    position: "absolute", // Positioning it on top of the bottom wave
    bottom: 40, // Controls how far above the bottom wave the buttons appear
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#004E92",
    fontWeight: "600",
  },
  wave: {
    position: "absolute",
    top: 0,
    height: 120,
  },
  bottomWave2: {
    position: "absolute",
    bottom: 0,

    height: 120,
  },
  bottomWave1: {
    // position: 'absolute',
    bottom: 0,
    height: 339,
  },
});
