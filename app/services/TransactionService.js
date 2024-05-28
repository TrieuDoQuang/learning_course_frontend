import { useAxiosPrivate } from "../hooks";

const TransactionService = () => {
  const axiosPrivate = useAxiosPrivate();

  const makeTransaction = async (transaction) => {
    try {
      const response = await axiosPrivate.post(
        "/transactions/makeTransaction",
        transaction
      );

      return response;
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  return {
    makeTransaction,
  };
};

export default TransactionService;
