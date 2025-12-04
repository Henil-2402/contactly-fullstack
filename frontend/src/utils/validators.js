export const isEmail = (email = "") => {
  email = email.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isPhone = (phone = "") => {
  phone = phone.trim();
  if (!phone) return false; // phone required
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
};
