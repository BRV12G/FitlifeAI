import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { axiosWithAuth } from "../../utils/api"; // assumes you have axios setup
import { useUser } from "../../contexts/userContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HealthStatus = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUser();

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        const axiosInstance = await axiosWithAuth();
        const response = await axiosInstance.get("/api/predict-health/");
        setHealthData(response.data);
      } catch (err) {
        console.error("Error fetching health data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHealthStatus();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#3A7CA5" />
    );
  }

  if (!healthData) {
    return <Text style={styles.error}>Failed to load health data.</Text>;
  }

  const renderCard = (label: string, value: string | number, icon: string) => (
   <View style={styles.card} key={label}>
      {/* <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text> */}
      <View style={styles.cardHeader}>
        <Icon name={icon} size={20} color="#3A7CA5" />
        <Text style={styles.cardLabel}>{label}</Text>
      </View>
      <Text style={styles.cardValue}>{typeof value === "number"
        ? value.toFixed(2)
        : /^\d+(\.\d+)?/.test(value)
        ? parseFloat(value.match(/^\d+(\.\d+)?/)![0]).toFixed(2) +
          value.replace(/^\d+(\.\d+)?/, "")
        : value}</Text>
    </View>

  );

  return (
     <ScrollView style={styles.container}>
      {/* <Text style={styles.heading}>Health Prediction Overview</Text> */}
      {/* <Text style={styles.result}>{healthData.health_status}</Text> */}
      {/* Health Status */}
          <Text style={styles.pageTitle}>Your Health Overview</Text>
      {/* <View
        style={[
          styles.statusCard,
          {
            backgroundColor:
              healthData.health_status === "Healthy" ? "#E0F7EC" : "#FFCDD2",
            borderColor:
              healthData.health_status === "Healthy" ? "#2E7D32" : "#C62828",
          },
        ]}
      >
              <View style={styles.statusContent}>

        <Icon
          name={
            healthData.health_status === "Healthy"
              ? "emoticon-happy-outline"
              : "emoticon-sad-outline"
          }
          size={40}
          color={
            healthData.health_status === "Healthy" ? "#2E7D32" : "#C62828"
          }
        />
        {/* <Text style={styles.statusText}>{healthData.health_status}</Text> */}
        {/* <View style={{ marginLeft: 12 }}>
          <Text style={styles.statusTitle}>{healthData.health_status}</Text>
          <Text style={styles.statusSubtext}>
            {healthData.health_status === "Healthy"
              ? "You're doing great! Keep maintaining your lifestyle."
              : "Let’s work together to improve your health!"}
          </Text>
        </View>
      </View>
      </View> */} 

      <View
  style={[
    styles.statusCard,
    {
      backgroundColor:
        healthData.health_status === "Healthy" ? "#DFFBE3" : "#FFE6E6",
      borderColor:
        healthData.health_status === "Healthy" ? "#1B5E20" : "#C62828",
      shadowColor:
        healthData.health_status === "Healthy" ? "#1B5E20" : "#C62828",
    },
  ]}
  >
   <View style={styles.statusContent}>
  <Icon
    name={
      healthData.health_status === "Healthy"
        ? "emoticon-excited-outline"
        : "emoticon-cry-outline"
    }
    size={50}
    color={
      healthData.health_status === "Healthy" ? "#1B5E20" : "#C62828"
    }
    style={{ marginBottom: 12 }}
  />
  <Text
    style={[
      styles.statusTitle,
      {
        color:
          healthData.health_status === "Healthy" ? "#1B5E20" : "#C62828",
      },
    ]}
  >
    {healthData.health_status}
  </Text>
  </View>
  <Text style={styles.statusSubtext}>
    {healthData.health_status === "Healthy"
      ? "You're doing great! Keep maintaining your lifestyle."
      : "Let's work together to improve your health!"}
  </Text>
</View>

     
      {/* <View style={styles.imageCard}>
        <Image source={require("../../assets/health-status/standing.png")} style={styles.image} />
        <Image source={require("../../assets/health-status/Dosa.png")} style={styles.image} /> */}
        {/* <Image source={require("../../assets/health-status/chicken.png")} style={styles.image} /> */}
        {/* <Image source={require("../../assets/health-status/bowl.png")} style={styles.image} /> */}

      {/* {renderCard("BMI Class", healthData.bmi_class)} */}
      {/* {renderCard("BMI Value", `${healthData.bmi_value} kg/m²`)} */}
      {/* </View> */}
      {/* Section: Health Info */}
      <Text style={styles.sectionHeading}>
        <Icon name="heart-pulse" size={18} color="#3A7CA5" /> Health Info
      </Text>
      <View style={styles.gridWrapper}>
      {renderCard("BMI Class", healthData.bmi_class, "scale-bathroom")}
      {renderCard("BMI Value", `${healthData.bmi_value} kg/m²`, "scale")}
                    {renderCard("Calories", `${healthData.calories} kcal`, "fire")}
        {/* {renderCard("Calories", `${healthData.calories} kcal`)} */}
      {/* {renderCard("Carbohydrates", `${healthData.carbohydrates} g`)} */}
      {/* {renderCard("Proteins", `${healthData.proteins} g`)} */}
      {/* {renderCard("Fats", `${healthData.fats} g`)} */}
      </View>
     
             <Image source={require("../../assets/health-status/sitting.png")} style={styles.chicken} />

      {/* {renderCard("Vitamin A", `${healthData.vitamin_a} mcg`)} */}
      {/* {renderCard("Vitamin C", `${healthData.vitamin_c} mg`)} */}
      {/* {renderCard("Vitamin D", `${healthData.vitamin_d} mcg`)} */}
      {/* Section: Macronutrients */}
      <Text style={styles.sectionHeading}>
        <Icon name="food-apple" size={18} color="#3A7CA5" /> Macronutrients
      </Text>
            <View style={styles.gridWrapper}>

      {/* {renderCard("Sodium", `${healthData.sodium} mg`)} */}
      {/* {renderCard("Potassium", `${healthData.potassium} mg`)} */}
      {/* {renderCard("Magnesium", `${healthData.magnesium} mg`)} */}
      {/* {renderCard("Iron", `${healthData.iron} mg`)} */}
      {/* {renderCard("Zinc", `${healthData.zinc} mg`)} */}
      {renderCard("Carbohydrates", `${healthData.carbohydrates} g`, "corn")}
      {renderCard("Proteins", `${healthData.proteins} g`, "fish")}
      {renderCard("Fats", `${healthData.fats} g`, "bottle-tonic")}
      </View>
      {/* Section: Micronutrients */}
      <Text style={styles.sectionHeading}>
        <Icon name="food-variant" size={18} color="#3A7CA5" /> Micronutrients
      </Text>
      <View style={styles.gridWrapper}>
      {renderCard("Vitamin A", `${healthData.vitamin_a} mcg`, "alpha-a")}
      {renderCard("Vitamin C", `${healthData.vitamin_c} mg`, "alpha-c")}
      {renderCard("Vitamin D", `${healthData.vitamin_d} mcg`, "alpha-d")}
      {renderCard("Sodium", `${healthData.sodium} mg`, "shaker-outline")}
      {renderCard("Potassium", `${healthData.potassium} mg`, "food")}
      {renderCard("Magnesium", `${healthData.magnesium} mg`, "alpha-m")}
      {renderCard("Iron", `${healthData.iron} mg`, "alpha-i")}
      {renderCard("Zinc", `${healthData.zinc} mg`, "alpha-z")}
      </View>

      {/* {renderCard("Fiber Intake", `${healthData.fiber} g`)} */}
      {/* {renderCard("Water Intake", `${healthData.water} L`)} */}
      {/* Section: Water & Fiber */}
      <Text style={styles.sectionHeading}>
        <Icon name="cup-water" size={18} color="#3A7CA5" /> Water & Fiber
      </Text>
      <View style={styles.gridWrapper}>
      {renderCard("Fiber Intake", `${healthData.fiber} g`, "leaf")}
      {renderCard("Water Intake", `${healthData.water} L`, "cup-water")}
      </View>
    </ScrollView>       
 
  );
};

export default HealthStatus;

const styles = StyleSheet.create({
 container: {
    backgroundColor: "#f4f9ff",
    padding: 16,
    flex: 1,
  },
  // heading: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   color: "#3A7CA5",
  //   marginBottom: 16,
  //   textAlign: "center",
  statusCard: {
borderWidth: 2,
  borderRadius: 20,
  padding: 6,
  alignItems: "center",
  justifyContent: "center",
  // marginBottom: 30,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 5,
  backgroundColor: "#fff",
  },
  // result: {
  //   fontSize: 18,
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 20,
    // textAlign: "center",
    // backgroundColor: "#3A7CA5",
    // padding: 10,
    // borderRadius: 10,
    // color: "#fff",
    // marginTop: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3A7CA5",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    // marginBottom: 12,
    marginBottom: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#3A7CA5",
    // paddingRight: 35,
    width: "48%",
  },
  // label: {
    // fontSize: 16,
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 1,
    top: -10,
  },
  cardLabel: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#333",
    // marginBottom: 4,
  },
  // value: {
  cardValue: {
    fontSize: 16,
    color: "#555",
    marginLeft: 28,
    fontWeight: "500",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 50,
  },
  section: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
    // gap: 20,
  },
  gridWrapper: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: 10, // Adjusts the space between cards
  // marginBottom: 20, 
  paddingHorizontal: 10, // Adds horizontal padding to the grid
  backgroundColor: "#f9f9f9",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#ddd",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  paddingVertical: 10, // Adds vertical padding to the grid
},
  image: {
    width: 160,
    height: 260,
    alignSelf: "center",
    marginTop : -190,
    // marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginLeft: -260,
  },
  // 🔼 [1] Page Title
pageTitle: {
  fontSize: 26,
  fontWeight: "bold",
  color: "#3A7CA5",
  marginBottom: 20,
  textAlign: "center",
},

statusContent: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: -15,
},
statusTitle: {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 8,
},
statusSubtext: {
   fontSize: 19,
  fontWeight: "500",
  color: "#444",
  textAlign: "center",
  lineHeight: 22,
},

  chicken: {
    width: 260,
    height: 260,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 140,
    marginTop: -80,
  },
});
