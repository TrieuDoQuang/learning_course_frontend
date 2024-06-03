import { useAxiosPrivate } from "../hooks";

const RewardService = () => {
  const axiosPrivate = useAxiosPrivate();

  //This function is used to get all rewards by making a GET request to the /rewards endpoint.
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

  //This function is used to get user's rewards by making a GET request with userid at /rewards/userReward/${userId} endpoint.
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

  //This function is used to redeem a reward by making a POST request to the /rewards/userReward/redeem endpoint.
  const redeemReward = async (rewardId, paymentAccountId) => {
    try {
      const response = await axiosPrivate.post(
        `/rewards/userReward/redeem`, {
          reward_id: rewardId,
          payment_account_id: paymentAccountId,
        });
      return response;
    } catch (e) {
      console.log("Cannot redeem reward: " + e);
    }
  };

  //This function is used to use a reward by making a PUT request to the /rewards/userReward/useReward endpoint.
  const useReward = async (rewardId, paymentAccountId) => {
    try {
      const response = await axiosPrivate.put(
        `/rewards/userReward/useReward`, {
          reward_id: rewardId,
          payment_account_id: paymentAccountId,
        });
      return response;
    } catch (e) {
      console.log("Cannot redeem reward: " + e);
    }
  };

  return {
    getAllRewards,
    getUserRewards,
    redeemReward,
    useReward,
  };
};

export default RewardService;
