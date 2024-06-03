import { useAxiosPrivate } from "../hooks";

const BeneficiaryService = () => {
  const axiosPrivate = useAxiosPrivate();


  //This function is used to insert a new beneficiary by making a POST request to the /beneficiaries endpoint.
  const insertBeneficiary = async (beneficiary) => {
    try {
      const response = await axiosPrivate.post(`/beneficiaries`, beneficiary);

      return response;
    } catch (e) {
      throw new Error(e.response.data); // Throwing the error to be caught in the calling function
    }
  };

  //This function is used to get beneficiaries by customer ID by making a GET request to the /beneficiaries/getByCustomerId/${customerId} endpoint.
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

  //This function is used to delete a beneficiary by making a DELETE request to the /beneficiaries/${id} endpoint.
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
