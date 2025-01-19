import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";

// Fonction pour créer une instance Axios personnalisée (si nécessaire)
export function getAxiosInstance() {
  if (!axios.defaults.baseURL) {
    axios.create({
      baseURL: "http://localhost:8000/api/",
    });
  }
  return axios;
}

// Intercepteur de requêtes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      console.log("Token utilisé : ", token);
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponses
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("Erreur de la réponse : ", error.response);

    // Si l'erreur est une 401 et que la requête n'a pas encore essayé de rafraîchir le token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("CC_Refresh_Token");  // Récupérer le refresh token
      if (!refreshToken) {
        // Si aucun refresh token n'est trouvé, rediriger vers la page de connexion
        console.error("Refresh token non trouvé. Redirection vers la page de connexion.");
        window.location.href = "/login";  // Vous pouvez rediriger vers la page de connexion ici
        return Promise.reject(error);
      }

      try {
        // Demander un nouveau token d'accès avec le refresh token
        const response = await axios.post("http://localhost:8000/api/users/refreshToken", { refresh_token: refreshToken });

        if (response.status === 200) {
          // Mettre à jour les tokens dans localStorage
          localStorage.setItem("CC_Token", response.data.access_token);
          localStorage.setItem("CC_Refresh_Token", response.data.refresh_token);

          // Mettre à jour l'en-tête Authorization pour les futures requêtes
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;

          // Réessayer la requête originale avec le nouveau token
          return axios(originalRequest);
        } else {
          // Si le rafraîchissement du token échoue, rediriger vers la page de connexion
          console.error("Erreur lors du rafraîchissement du token");
          window.location.href = "/login";
        }
      } catch (refreshError) {
        // Si une erreur se produit lors de la demande de rafraîchissement du token
        console.error("Erreur lors de la tentative de rafraîchissement du token : ", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Retourner l'erreur si la condition ci-dessus n'est pas remplie
    return Promise.reject(error);
  }
);

export default axios;
