import axios from "../api/axios";

export const login = async (loginData) => {
  try {
    const response = await axios.post("/customers/login", loginData);

    return response;
  } catch (e) {
    throw new Error(e.response.data);
  }
};

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
