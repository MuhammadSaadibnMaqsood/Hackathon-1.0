export const validateLogin = (email, password) => {
  if (!email.trim()) return "Email is required";
  if (!password.trim()) return "Password is required";
  if (!email.includes("@")) return "Invalid email";

  return "valid";
};

export const validateSignup = (email, password, confirmPassword) => {
  if (!email.trim()) {
    return "Email missing";
  }
  if (!email.includes("@gmail.com")) {
    return "Invalid email";
  }
  if (!password.trim()) {
    return "password missing";
  }
  if (!confirmPassword.trim()) {
    return "Confirm password missing";
  }

  if (password !== confirmPassword) {
    return "Password mismatch";
  }
  if (password.length < 6) {
    return "Password must be atleast 6 character long";
  }

  return "valid";
};
