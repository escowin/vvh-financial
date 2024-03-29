function captureRadioValue() {
  let radio = document.getElementsByName("contact");

  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      return radio[i].value;
    }
  }
}

async function editClientFormHandler(e) {
  e.preventDefault();

  // form values
  const firstName = document
    .querySelector('input[name="first-name"]')
    .value.trim();
  const lastName = document
    .querySelector('input[name="last-name"]')
    .value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const phone = document.querySelector('input[name="phone"]').value.trim();
  const contact = captureRadioValue();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/clients/${id}`, {
    method: "put",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      contact,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

// calls
document
  .getElementById("edit-client-form")
  .addEventListener("submit", editClientFormHandler);
