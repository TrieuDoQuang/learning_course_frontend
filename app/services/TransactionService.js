import { useAxiosPrivate } from "../hooks";

const TransactionService = () => {
  const axiosPrivate = useAxiosPrivate();

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
        // Invalid OTP
        throw new Error("Invalid OTP");
      } else {
        // Other errors
        throw new Error(
          error.response.data || error.message || "Unknown error occurred"
        );
      }
    }
  };

  return {
    sendOtp,
    makeTransaction,
  };
};

export default TransactionService;
