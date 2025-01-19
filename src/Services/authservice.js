import axios from "../Api/axios";
const USER_API = "users";
export const signup = async (user) => {
  return await axios.post(USER_API + "/register", user);
};
export const signin = async (user) => {
  return await axios.post(USER_API + "/login", user);
};
export const logout = async () => {
  return await axios.post(USER_API + "/logout");
};
export const profile = async () => {
  try {
    const response = await axios.get(USER_API + "/user-profile");
    console.log(response.data); // Affiche les données du profil
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

