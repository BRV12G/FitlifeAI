import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const activityLevels = [
  { label: "Sedentary: little or no exercise", value: 1.2 },
  { label: "Light: exercise 1–3 times/week", value: 1.375 },
  { label: "Moderate: exercise 4–5 times/week", value: 1.55 },
  { label: "Active: daily exercise or intense exercise 3–4 times/week", value: 1.725 },
  { label: "Very Active: intense exercise 6–7 times/week", value: 1.9 },
  { label: "Extra Active: very intense exercise daily, or physical job", value: 2.0 },
];

const goals = [
  { label: "Maintain Weight", value: "maintain" },
  { label: "Lose Weight", value: "lose" },
  { label: "Gain Muscle", value: "gain" },
];

const NutritionCalculatorScreen = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState(""); // cm
  const [weight, setWeight] = useState(""); // kg
  const [activity, setActivity] = useState(activityLevels[1].value);
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (!w || !h || !a) return;

    // Mifflin-St Jeor Equation
    let bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = bmr * activity;

    let calories = tdee;

    if (goal === "lose") calories -= 500;
    else if (goal === "gain") calories += 300;

    // Macronutrient breakdown
    const protein = (w * 2.2) * (goal === "gain" ? 1.2 : goal === "lose" ? 1.1 : 1.0); // g
    const fat = (calories * 0.25) / 9; // g
    const remainingCalories = calories - (protein * 4 + fat * 9);
    const carbs = remainingCalories / 4; // g

    setResult({
      calories: Math.round(calories),
      protein: Math.round(protein),
      fat: Math.round(fat),
      carbs: Math.round(carbs),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍽️ Nutrition Needs Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.optionRow}>
        {["male", "female"].map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.option, gender === g && styles.selected]}
            onPress={() => setGender(g)}
          >
            <Text>{g.charAt(0).toUpperCase() + g.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Activity Level</Text>
      <Picker
        selectedValue={activity}
        style={styles.picker}
        onValueChange={(itemValue) => setActivity(itemValue)}
      >
        {activityLevels.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Goal</Text>
      <Picker
        selectedValue={goal}
        style={styles.picker}
        onValueChange={(itemValue) => setGoal(itemValue)}
      >
        {goals.map((g) => (
          <Picker.Item key={g.value} label={g.label} value={g.value} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={calculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>🔍 Your Daily Needs:</Text>
          <Text>Calories: {result.calories} kcal</Text>
          <Text>Protein: {result.protein} g</Text>
          <Text>Carbs: {result.carbs} g</Text>
          <Text>Fat: {result.fat} g</Text>
        </View>
      )}
      <Image source={require('@/assets/nutritients/girl-nutrients.png')} style={styles.image}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f9fafe" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#3A7CA5" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  label: { fontWeight: "bold", marginVertical: 10 },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  option: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginRight: 8,
  },
  selected: {
    backgroundColor: "#3A7CA5",
    borderColor: "#3A7CA5",
    borderWidth: 1,
    color: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#3A7CA5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  resultBox: {
    backgroundColor: "#e1f5fe",
    padding: 16,
    borderRadius: 10,
  },
  resultTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    width: 150,
    height: 220,
    alignSelf: "center",
  },
});

export default NutritionCalculatorScreen;
