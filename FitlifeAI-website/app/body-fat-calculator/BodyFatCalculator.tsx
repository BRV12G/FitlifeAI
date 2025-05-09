import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";

const BodyFatCalculator = () => {
  const [useNavyMethod, setUseNavyMethod] = useState(true);
  const [gender, setGender] = useState<"male" | "female">("male");

  const [height, setHeight] = useState<number>(0); // cm
  const [weight, setWeight] = useState<number>(0); // kg
  const [age, setAge] = useState<number>(0);
  const [neck, setNeck] = useState<number>(0); // cm
  const [waist, setWaist] = useState<number>(0); // cm
  const [hip, setHip] = useState<number>(0); // cm

  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  const toggleMethod = () => setUseNavyMethod((prev) => !prev);

  const calculateBodyFat = () => {
    let bf = 0;

    if (useNavyMethod) {
      if (!height || !neck || !waist || (gender === "female" && !hip)) {
        alert("Please fill in all fields for Navy Method.");
        return;
      }

      if (gender === "male") {
        bf =
          495 /
            (1.0324 -
              0.19077 * Math.log10(waist - neck) +
              0.15456 * Math.log10(height)) -
          450;
      } else {
        bf =
          495 /
            (1.29579 -
              0.35004 * Math.log10(waist + hip - neck) +
              0.221 * Math.log10(height)) -
          450;
      }
    } else {
      if (!height || !weight || !age) {
        alert("Please fill in all fields for BMI Method.");
        return;
      }

      const heightInM = height / 100;
      const bmi = weight / (heightInM * heightInM);

      if (gender === "male") {
        bf = 1.20 * bmi + 0.23 * age - 16.2;
      } else {
        bf = 1.20 * bmi + 0.23 * age - 5.4;
      }
    }

    setBodyFat(bf);
    if (bf < 6) {
      setMessage("You are extremely lean. Monitor health closely.");
    } else if (bf < 18) {
      setMessage("You are in a healthy range! Keep it up.");
    } else if (bf < 25) {
      setMessage("You are slightly over average. Consider a healthier routine.");
    } else {
      setMessage(
        "High body fat detected. Try FitLife AI or Diet Recommendations to improve!"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Body Fat Calculator</Text>

      {/* Method Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>
          {useNavyMethod ? "U.S. Navy Method" : "BMI Method"}
        </Text>
        <Switch value={useNavyMethod} onValueChange={toggleMethod} />
      </View>

      {/* Gender Selection */}
      <View style={styles.radioContainer}>
        {["male", "female"].map((g) => (
          <TouchableOpacity
            key={g}
            onPress={() => setGender(g as "male" | "female")}
            style={styles.radioButton}
          >
            <View
              style={[
                styles.circle,
                gender === g && styles.selected,
              ]}
            />
            <Text style={styles.radioText}>{g.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Common Inputs */}
      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(t) => setHeight(Number(t))}
      />

      {useNavyMethod ? (
        <>
          <Text style={styles.label}>Neck circumference (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(t) => setNeck(Number(t))}
          />
          <Text style={styles.label}>Waist circumference (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(t) => setWaist(Number(t))}
          />
          {gender === "female" && (
            <>
              <Text style={styles.label}>Hip circumference (cm)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(t) => setHip(Number(t))}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(t) => setWeight(Number(t))}
          />
          <Text style={styles.label}>Age (years)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(t) => setAge(Number(t))}
          />
        </>
      )}

      {/* Calculate */}
      <TouchableOpacity style={styles.button} onPress={calculateBodyFat}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {/* Result */}
      {bodyFat !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.result}>
            Estimated Body Fat: {bodyFat.toFixed(1)}%
          </Text>
          <Text style={styles.category}>{message}</Text>
          {(bodyFat >= 25 || bodyFat < 6) && (
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() =>
                window.open(
                  "https://fitlifeai-voice-assistant.vercel.app/",
                  "_blank"
                )
              }
            >
              <Text style={styles.ctaText}>Try FitLife AI</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default BodyFatCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f9",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3A7CA5",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#3A7CA5",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  result: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3A7CA5",
    textAlign: "center",
  },
  category: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    color: "#444",
  },
  ctaButton: {
    marginTop: 15,
    backgroundColor: "#ff7043",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  ctaText: {
    color: "#fff",
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#3A7CA5",
    marginRight: 8,
  },
  selected: {
    backgroundColor: "#3A7CA5",
  },
  radioText: {
    fontSize: 16,
  },
});
