import { get } from "./index";
export const initializeStores = async () => {
  try {
    const response = await get("/clp/all");
    return response.data.data;
  } catch (error) {
    console.error("스토어 초기화 실패:", error);
    throw error; // 실패 시 밖에서 처리할 수 있도록 예외 전파
  }
};
