export const useUserId = (token = localStorage.getItem("token")) => {
  const userId = token && JSON.parse(atob(token.split(".")[1])).id;
  return Number(userId);
};
