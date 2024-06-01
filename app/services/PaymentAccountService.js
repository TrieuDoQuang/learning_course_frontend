import { useAxiosPrivate } from "../hooks";

const PaymentAccountService = () => {
  const axiosPrivate = useAxiosPrivate();


  //This function is used to insert a new payment account by making a POST request to the /paymentAccounts endpoint.
  const insertPaymentAccount = async (customerId, accountNumber) => {
    try {
      const response = await axiosPrivate.post("/paymentAccounts", {
        customer_id: customerId,
        account_number: accountNumber,
      });

      return response;
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  //This function is used to get payment accounts by customer ID by making a GET request to the /paymentAccounts/getPaymentAccounts/${customerId} endpoint.
  const getPaymentAccountByAccountNumber = async (accountNumber) => {
    try {
      const response = await axiosPrivate.get(
        `/paymentAccounts/getByAccountNumber/${accountNumber}`
      );

      return response;
    } catch (e) {
      throw new Error(e.response);
    }
  };

  //This function is used to get payment accounts by customer ID by making a GET request to the /paymentAccounts/getPaymentAccounts/${customerId} endpoint.
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

  //This function is used to get a payment account by ID by making a GET request to the /paymentAccounts/${paymentAccountId} endpoint.
  const getPaymentAccountById = async (paymentAccountId) => {
    try {
      const response = await axiosPrivate.get(
        `/paymentAccounts/${paymentAccountId}`
      );
      return response;
    } catch (e) {
      console.log("Cannot get Payment Accounts: " + e);
    }
  };

  //This function is used to get the default payment account by customer ID by making a GET request to the /paymentAccounts/getDefaultAccount/${customerId} endpoint.
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

  //This function is used to get a customer by account number by making a GET request to the /paymentAccounts/getByAccountNumber/${accountNumber} endpoint.
  const getCustomerByAccountNumber = async (accountNumber) => {
    try {
      const response = await axiosPrivate.get(
        `/paymentAccounts/getByAccountNumber/${accountNumber}`
      );
      return response;
    } catch (e) {
      console.log("Cannot get Payment Accounts: " + e);
    }
  };

  //This function is used to set a payment account as default by making a POST request to the /paymentAccounts/setDefaultAccount endpoint.
  const setPaymentAccountDefault = async (customerId, accountNumber) => {
    try {
      const response = await axiosPrivate.post(
        `/paymentAccounts/setDefaultAccount`,
        {
          customer_id: customerId,
          account_number: accountNumber,
        }
      );
      return response;
    } catch (e) {
      console.log("Cannot set Default Payment Account: " + e);
    }
  };

  //This function is used to top up a payment account by making a PUT request to the /paymentAccounts/topUpPaymentAccount/${paymentAccountId} endpoint.
  const topUpPaymentAccount = async (paymentAccountId, amount) => {
    try {
      const response = await axiosPrivate.put(
        `/paymentAccounts/topUpPaymentAccount/${paymentAccountId}`,
        {
          amount: amount,
        }
      );
      console.log(response);

      return response;
    } catch (e) {
      console.log("Cannot top up: " + e);
      return e.response;
    }
  };

  //This function is used to withdraw from a payment account by making a PUT request to the /paymentAccounts/withdrawPaymentAccount/${paymentAccountId} endpoint.
  const withdrawPaymentAccount = async (paymentAccountId, amount) => {
    try {
      const response = await axiosPrivate.put(
        `/paymentAccounts/withdrawPaymentAccount/${paymentAccountId}`,
        {
          amount: amount,
        }
      );
      return response;
    } catch (e) {
      console.log("Cannot withdraw: " + e);
      return e.response;
    }
  };

  return {
    insertPaymentAccount,
    getPaymentAccounts,
    getDefaultPaymentAccount,
    getCustomerByAccountNumber,
    getPaymentAccountById,
    setPaymentAccountDefault,
    topUpPaymentAccount,
    withdrawPaymentAccount,
    getPaymentAccountByAccountNumber,
  };
};

export default PaymentAccountService;
