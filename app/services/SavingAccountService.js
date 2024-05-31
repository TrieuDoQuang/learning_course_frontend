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

  return {
    getUserSavingAccounts,
  };
};

export default SavingAccountService;
