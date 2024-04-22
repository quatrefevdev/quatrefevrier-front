export const redirectIfNoToken = (token, navigate) => {
  if (!token) {
    navigate("/login");
  }
};
