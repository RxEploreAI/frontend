import axios from "axios";

export function apiCall() {
  return axios
    .get("/api")
    .then((response) => {
      console.log("Données reçues :", response.data.message);
      return response.data.message;
    })
    .catch((error) => {
      console.error("Erreur lors de l’appel :", error);
      throw error;
    });
}
