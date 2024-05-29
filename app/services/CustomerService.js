import { useAxiosPrivate } from "../hooks";

const CustomerService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getCustomerById = async (customerId) => {
    try {
      const response = await axiosPrivate.get(
        `/customers/getById/${customerId}`
      );

      return response;
    } catch (e) {
      console.log("Cannot get Customer: " + e);
    }
  };

  const ChangePassword = async (changePasswordData, customerId) => {
    try {
      const response = await axiosPrivate.put(
        `/customers/changePassword/${customerId}`,
        changePasswordData
      );
      return response;
    } catch (e) {
      console.log("Cannot change Password: " + e);
    }
  };

  return {
    getCustomerById,
    ChangePassword,
  };
};

export default CustomerService;
