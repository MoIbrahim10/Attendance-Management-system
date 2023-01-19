export function validateAge(age) {
  if (age === "") {
    return { isValid: false, error: "Age is required!" };
  }
  if (isNaN(age)) {
    return { isValid: false, error: "Age must be a number" };
  }
  if (+age < 21 || +age > 60) {
    return { isValid: false, error: "Age must be between 21 and 60" };
  }
  return { isValid: true, error: null };
}