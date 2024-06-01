import { useAxiosPrivate } from "../hooks";

const PaymentAccountService = () => {
  const axiosPrivate = useAxiosPrivate();

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
