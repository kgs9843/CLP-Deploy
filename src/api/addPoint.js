import { post } from "./index";
export const addPoint = async () => {
  const response = await post("/point/add");
  return response.data;
};
