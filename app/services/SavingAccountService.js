import { useAxiosPrivate } from "../hooks";

const SavingAccountService = () => {
  const axiosPrivate = useAxiosPrivate();

  //This function is used to get user's saving accounts by making a GET request with userid at /savingAccounts/userSavingAccount/${userId} endpoint.
  const getUserSavingAccounts = async (userId) => {
    try {
      const response = await axiosPrivate.get(
        `/savingAccounts/userSavingAccount/${userId}`
      );
      return response;
    } catch (e) {
      console.log("Cannot get user's saving accounts: " + e);
    }
  };

  //This function is used to get all interest rates by making a GET request to the /interestRates endpoint.
  const getAllInterestRates = async () => {
    try {
      const response = await axiosPrivate.get(`/interestRates`);
      return response;
    } catch (e) {
      console.log("Cannot get interest rates: " + e);
    }
  };

  //This function is used to insert a new saving account by making a POST request to the /savingAccounts endpoint.
  const insertSavingAccount = async (
    interestRateId,
    paymentAccountId,
    accountType,
    depositAmount
  ) => {
    try {
      const response = await axiosPrivate.post(`/savingAccounts`, {
        saving_initial_amount: depositAmount,
        payment_account_id: paymentAccountId,
        interest_rate_id: interestRateId,
        account_type: accountType,
      });
      return response;
    } catch (e) {
      console.log("Cannot create saving account: " + e);
    }
  };

  //This function is used to withdraw a saving account by making a PUT request to the /savingAccounts/withdraw/${savingAccountId} endpoint.
  const withdrawSavingAccount = async (savingAccountId) => {
    try {
      const response = await axiosPrivate.put(
        `/savingAccounts/withdraw/${savingAccountId}`
      );
      return response;
    } catch (e) {
      console.log("Cannot withdraw saving account: " + e);
    }
  };

  return {
    getUserSavingAccounts,
    getAllInterestRates,
    insertSavingAccount,
    withdrawSavingAccount,
  };
};

export default SavingAccountService;
