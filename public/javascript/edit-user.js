async function editUserFormHandler(e) {
  e.preventDefault();

  const id = document.getElementById('id').innerText;
  const username = document.getElementById("edit-username").value.trim();
  const email = document.getElementById("edit-email").value.trim();
  const password = document.getElementById("edit-password").value.trim();

  const response = await fetch(`/api/users/${id}`, {
    method: "put",
    body: JSON.stringify({
      username, email, password
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .getElementById("edit-user-form")
  .addEventListener("submit", editUserFormHandler);
