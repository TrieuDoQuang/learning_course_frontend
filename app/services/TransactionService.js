import { useAxiosPrivate } from "../hooks";

const TransactionService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAllTransactionsByCustomerId = async (customerId) => {
    try {
      const response = await axiosPrivate.get(
        `/transactions/getByCustomerId/${customerId}`
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("Cannot find Transactions History");
      } else {
        throw new Error(
          error.response.data || error.message || "Unknown error occurred"
        );
      }
    }
  };

  const sendOtp = async (otpRequest) => {
    try {
      const response = await axiosPrivate.post(
        "/transactions/sendOtp",
        otpRequest
      );

      return response;
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  const makeTransaction = async (otpVerificationRequest) => {
    try {
      const response = await axiosPrivate.post(
        "/transactions/verifyOtpAndMakeTransaction",
        otpVerificationRequest
      );

      // Check if response is successful
      if (response.status === 200) {
        // Transaction completed successfully
        return response.data;
      } else {
        // Some other error occurred
        throw new Error(response.data || "Unknown error occurred");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("Invalid OTP");
      } else {
        throw new Error(
          error.response.data || error.message || "Unknown error occurred"
        );
      }
    }
  };

  return {
    sendOtp,
    getAllTransactionsByCustomerId,
    makeTransaction,
  };
};

export default TransactionService;
