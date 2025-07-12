import { post } from "./index";

export const addPoint = async (point) => {
  const response = await post("/point/add", { addPoint: point });
  return response.data;
};
