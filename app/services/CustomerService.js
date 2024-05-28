import { useAxiosPrivate } from "../hooks";

const CustomerService = () => {

  const axiosPrivate = useAxiosPrivate();

  const getPinNumberByCustomerId = async (customerId) => {
    try {
      const response = await axiosPrivate.get(
        `/customers/getPinNumber/${customerId}`
      );

      return response;
    } catch (e) {
      console.log("Cannot get Pin Number: " + e);
    }
  };

  return {
    getPinNumberByCustomerId,
  };
};

export default CustomerService;
