const ctaForm = document.getElementById("cta-form");

let prospects = [];

// logic
function copyright() {
  let date = new Date().getFullYear();
  console.log(`
    \u00A9 ${date} Edwin M. Escobar
    https://github.com/escowin
    `);

  const copyrightEl = document.getElementById("copyright");
  copyrightEl.innerText = `\u00A9${date}`;
};

function formSubmit(e) {
  e.preventDefault();
  const firstNameInput = document.getElementById("first-name-input");
  const lastNameInput = document.getElementById("last-name-input");
  const phoneNumberInput = document.getElementById("phone-number-input");
  const emailInput = document.getElementById("email-input");

  const prospect = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    phoneNumber: phoneNumberInput.value,
    email: emailInput.value,
  };

  prospects.push(prospect);
  console.log(prospects);
};

// calls
ctaForm.addEventListener("submit", formSubmit);
copyright();
