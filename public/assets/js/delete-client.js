async function deleteClientHandler(e) {
  e.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/clients/${id}`, {
    method: "delete",
  });

  // dashboard redirect after deletion
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .getElementById("delete-btn")
  .addEventListener("click", deleteClientHandler);
