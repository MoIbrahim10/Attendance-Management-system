/** check if mail is registered before **/ 

export async function validateEmail(email) {
  try {
    const response = await fetch('http://localhost:3000/employees');
    const users = await response.json();
    const emails = users.filter((user) => user.email === email);

    const response2 = await fetch('http://localhost:3000/pending');
    const pending = await response2.json();
    const pendingEmails = pending.filter((user) => user.email === email);


    if (emails.length > 0 || pendingEmails.length > 0) 
      return { isValid: false, error: "Email already exists!" };
    
    if (email="")  return { isValid: false, error: "Please make sure that you filled all fields" };
    return { isValid: true, error: null };
  } catch (err) {
    console.log(err);
    return { isValid: false, error: "An error occurred while checking email availability!" };
  }
}
