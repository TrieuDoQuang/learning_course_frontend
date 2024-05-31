import { useAxiosPrivate } from "../hooks";

const SavingAccountService = () => {
  const axiosPrivate = useAxiosPrivate();

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

  const getAllInterestRates = async () => {
    try {
      const response = await axiosPrivate.get(`/interestRates`);
      return response;
    } catch (e) {
      console.log("Cannot get interest rates: " + e);
    }
  };

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
