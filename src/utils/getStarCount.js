export const getStarCount = popularity => {
  if (popularity === 0) return 0;
  if (popularity >= 200) return 5;
  return Math.floor(popularity / 50) + 1;
};
