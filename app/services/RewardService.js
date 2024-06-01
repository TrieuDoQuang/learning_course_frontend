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

  const getUserRewards = async (userId) => {
    try {
      const response = await axiosPrivate.get(
        `/rewards/userReward/${userId}`
      );
      return response;
    } catch (e) {
      console.log("Cannot get User Rewards: " + e);
    }
  };

  return {
    getAllRewards,
    getUserRewards,
  };
};

export default RewardService;
