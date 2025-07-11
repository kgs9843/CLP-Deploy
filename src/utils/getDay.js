{
  /*데드라인 디데이로 정해주는 함수 */
}
export const getDDay = (deadline) => {
  const today = new Date();
  const endDate = new Date(deadline);
  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `D-${diffDays}` : "만료";
};
