import { API_URL } from "./API_URL.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!response.ok) {
    throw new Error('Error en la autenticación')
  }

  const data = await response.json()

  await AsyncStorage.setItem("token", data.token);
  // console.log("Token guardado en localStorage:", data.token);

  return data;
}

export async function signup(nombre, email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password })
  })

  if (!response.ok) {
    throw new Error('Error en el registro')
  }

  return response.json()
}

export async function getUserName(uuid) {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_URL}/user/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const text = await response.text();
  console.log("Texto de respuesta:", text);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${text}`)
  }

  return JSON.parse(text)
}