import axios from "../api/axios";

export const insertPaymentAccount = async (paymentAccount) => {
  try {
    const response = await axios.get("/paymentAccounts", paymentAccount);

    return response;
  } catch (e) {
    console.log("Error: " + e);
  }
};
