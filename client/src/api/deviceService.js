import axios from "axios";

export const API_BASE_URL = "http://127.0.0.1:5000";

// Fonction pour obtenir tous les devices
export const fetchDevices = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/devices`);
  return data;
};

// Fonction pour obtenir les détails d'un device par son nom
export const fetchDeviceDetail = async (deviceName) => {
  const { data } = await axios.get(`${API_BASE_URL}/devices/${deviceName}`);
  return data;
};

// Fonction pour mettre à jour l'état d'un device
export const toggleDeviceState = async ({ deviceName, newState }) => {
  await axios.post(`${API_BASE_URL}/devices/${deviceName}/${newState}`, {
    state: newState,
  });
};
