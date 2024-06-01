import { useAxiosPrivate } from "../hooks";

//This function is used to get a customer by ID by making a GET request to the /customers/getById/${customerId} endpoint.
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

  //This function is used to change a customer's password by making a PUT request to the /customers/changePassword/${customerId} endpoint.
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
