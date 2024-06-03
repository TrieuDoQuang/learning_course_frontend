import axios from "../api/axios";

// This function is used to handle login requests by making a POST request to the /customers/login endpoint.
export const login = async (loginData) => {
  try {
    const response = await axios.post("/customers/login", loginData);

    return response;
  } catch (e) {
    throw new Error(e.response.data);
  }
};

// This function is used to handle sign up requests by making a POST request to the /customers/insertCustomer endpoint.
export const signUp = async (customerData) => {
  try {
    const response = await axios.post(
      "/customers/insertCustomer",
      customerData
    );

    return response;
  } catch (e) {
    throw new Error(e.response.data);
  }
};
