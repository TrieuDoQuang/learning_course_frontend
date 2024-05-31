import { useAxiosPrivate } from "../hooks";

const BeneficiaryService = () => {
  const axiosPrivate = useAxiosPrivate();

  const insertBeneficiary = async (beneficiary) => {
    try {
      const response = await axiosPrivate.post(`/beneficiaries`, beneficiary);

      return response;
    } catch (e) {
      throw new Error(e.response.data); // Throwing the error to be caught in the calling function
    }
  };

  const getBeneficiariesByCustomerId = async (customerId) => {
    try {
      const response = await axiosPrivate.get(
        `/beneficiaries/getByCustomerId/${customerId}`
      );
      return response;
    } catch (e) {
      console.log("Cannot get beneficiaries: " + e);
    }
  };

  const deleteBeneficiary = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/beneficiaries/${id}`);
      return response;
    } catch (e) {
      console.log("Cannot delete beneficiary: " + e);
    }
  };

  return {
    insertBeneficiary,
    getBeneficiariesByCustomerId,
    deleteBeneficiary,
  };
};

export default BeneficiaryService;
