import axios from "../api/axios";

export const login = async (loginData) => {

  try {
    const response = await axios.post("/customers/login", loginData);

    return response;
  } catch (error) {
    console.log(error);
  }
};
