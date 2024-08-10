const generateAuthError = (message: string) => {
  switch (message) {
    case "INVALID_LOGIN_CREDENTIALS":
      return "Email or Password is incorrect";
    case "EMAIL_EXIST":
      return "This Email is already exist";
    default:
      return "Too many try's. Try again later";
  }
};
export default generateAuthError;
