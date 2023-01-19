export function validateEmail(email){
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (email === "") {
    return { isValid: false, error: "Email is required!" };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Email must be in the form ali@example.com" };
  }
  return { isValid: true, error: null };
}