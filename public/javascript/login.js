// logic
async function loginFormHandler(e) {
  e.preventDefault();

  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  console.log(email, password)
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    // succesful logins redirect session users to dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

// calls
document
  .getElementById("login-form")
  .addEventListener("submit", loginFormHandler);
