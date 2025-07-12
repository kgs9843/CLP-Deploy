import { get } from "./index";
export const fetchPoint = async () => {
  const response = await get("/user/point");
  return response.data;
};
