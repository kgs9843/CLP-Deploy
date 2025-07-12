import { get } from "./index";
export const checkUser = async () => {
  const response = await get("/user");
  return response;
};
