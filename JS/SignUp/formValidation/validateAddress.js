export function validateAddress(address) {
  const addressRegex = /(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2}/g;
  if (address === "") {
    return { isValid: false, error: "Address is required!" };
  }
  if (!addressRegex.test(address)) {
    return { isValid: false, error: "Adress must be in the form streetNo , Street Name, City, Country" };
  }
  return { isValid: true, error: null };
}