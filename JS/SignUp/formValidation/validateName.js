export function validateName(name) {
  const nameRegex = /^[A-Za-z ]+$/;
  if (name === "") {
    return { isValid: false, error: "Name is required!" };
  }
  if (!nameRegex.test(name)) {
    return { isValid: false, error: "Name must contain only characters" };
  }
  return { isValid: true, error: null };
}