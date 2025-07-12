import { get } from "./index";

export const fetchCoupon = async (userId) => {
  const response = await get(`/coupon/all/${userId}`);
  return response.data.data;
};
