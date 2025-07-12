import { post } from "./index";

export const subtractPoint = async (point) => {
  const response = await post("/point/subtract", { subtractPoint: point });
  return response.data;
};
