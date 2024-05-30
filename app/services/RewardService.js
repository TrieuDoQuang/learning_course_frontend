import { useAxiosPrivate } from "../hooks";

const RewardService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAllRewards = async () => {
    try {
      const response = await axiosPrivate.get(
        `/rewards`
      );
      return response;
    } catch (e) {
      console.log("Cannot get Rewards: " + e);
    }
  };

  return {
    getAllRewards,
  };
};

export default RewardService;
