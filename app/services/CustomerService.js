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

  return {
    getCustomerById,
  };
};

export default CustomerService;
