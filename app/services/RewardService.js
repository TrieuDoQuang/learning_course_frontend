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
