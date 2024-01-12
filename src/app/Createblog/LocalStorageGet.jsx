export const getProfileIdFromLocalStorage = () => {
  const localUserId = localStorage.getItem("userId");
  return localUserId;
};
