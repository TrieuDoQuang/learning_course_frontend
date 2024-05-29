import { useAxiosPrivate } from "../hooks";

const PaymentAccountService = () => {
  
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

  const getDefaultPaymentAccount = async (customerId) => {
    try {
      const response = await axiosPrivate.get(
        `/paymentAccounts/getDefaultAccount/${customerId}`
      );

      return response;
    } catch (e) {
      console.log("Cannot get Default Payment Account: " + e);
    }
  };


  const getCustomerNameByAccountNumber = async (accountNumber) => {
    try {
      const response = await axiosPrivate.get(
        `/paymentAccounts/getByAccountNumber/${accountNumber}`
      );

      return response;
    } catch (e) {
      console.log("Cannot get Payment Accounts: " + e);
    }
  };

  return {
    insertPaymentAccount,
    getPaymentAccounts,
    getDefaultPaymentAccount,
    getCustomerNameByAccountNumber,
  };
};

export default PaymentAccountService;
