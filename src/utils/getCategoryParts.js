//카테고리 가공 함수
export const getCategoryParts = (category_name) => {
  if (!category_name) return [];

  const parts = category_name.split(">").map((s) => s.trim());
  if (parts.length >= 3) {
    return parts.slice(-2);
  } else if (parts.length === 2) {
    return [parts[1]];
  } else {
    return [];
  }
};
