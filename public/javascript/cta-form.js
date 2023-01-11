async function ctaFormHandler(e) {
  e.preventDefault();

  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const contact = document.querySelector('input[name="contact"]').value.trim();
  const clientText = document.getElementById("client-text").value.trim();

  // completed form will post to database
  if (firstName && lastName && email && phone && contact && clientText) {
  }
  const response = await fetch(`/api/clients`, {
    method: "post",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      contact,
      clientText,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.getElementById("cta-form").addEventListener("submit", ctaFormHandler);
