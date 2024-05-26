import axios from "../api/axios";

export const makeTransaction = async (transaction) => {
  try {
    const response = await axios.get(
      "/transactions/makeTransaction",
      paymentAccount
    );

    return response;
  } catch (e) {
    console.log("Error: " + e);
  }
};
