import axios from "axios";

export const redirectIfNoToken = async (token, navigate) => {
  // Test if the token exist in BDD , if NOT redirect to /login
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      // Redirect to login page if unauthorized
      navigate("/login");
    } else {
      console.error("Error checking authentication:", error);
    }
  }
};
