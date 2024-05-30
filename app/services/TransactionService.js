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

      return response;
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  return {
    sendOtp,
    makeTransaction,
  };
};

export default TransactionService;
