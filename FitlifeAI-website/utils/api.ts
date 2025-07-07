import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.0.191:8000"; //mobile
// const API_BASE_URL = "http://127.0.0.1:8000" //browser

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

export const axiosWithAuth = async (): Promise<AxiosInstance> => {
  const token = await getAuthToken();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
  });
};
