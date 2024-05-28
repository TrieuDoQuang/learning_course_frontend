import axios from "../api/axios";
import { useAxiosPrivate } from "../hooks";

const PaymentAccount = () => {
  const axiosPrivate = useAxiosPrivate();
  const insertPaymentAccount = async (paymentAccount) => {
    try {
      const response = await axiosPrivate.post(
        "/paymentAccounts",
        paymentAccount
      );

      return response;
    } catch (e) {
      console.log("Error: " + e);
    }
  };
  const getPaymentAccounts = async (customerId) => {
    try {
      const response = await axiosPrivate.get(
        `/paymentAccounts/getPaymentAccounts/${customerId}`
      );

      return response;
    } catch (e) {
      console.log("Cannot get Payment Accounts: " + e);
    }
  };
  return { insertPaymentAccount, getPaymentAccounts };
};

export default PaymentAccount;
