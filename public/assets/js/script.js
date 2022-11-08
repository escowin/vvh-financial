// dom elements
const logoEl = document.getElementById("logo");
const appointmentForm = document.getElementById("cta-form");

// data
// let prospects = [];

// logic
const copyright = () => {
  let date = new Date().getFullYear();
  console.log(`
    Site by Edwin M. Escobar
    https://github.com/escowin
    `);

  const dateEl = document.getElementById("date");
  dateEl.innerText = `\u00A9 ${date}`;
}

const formSubmit = (e) => {
  e.preventDefault();
  const firstName = document.getElementById("first-name-input").value.trim();
  const lastName = document.getElementById("last-name-input").value.trim();
  const phoneNumber = document.getElementById("phone-number-input").value.trim();
  const email = document.getElementById("email-input").value.trim();

  const prospect = {
    firstName,
    lastName,
    phoneNumber,
    email
  };

  // prospects.push(prospect);
  // console.log(prospects);

  fetch('/api/prospects', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(prospect)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    alert(`error: ${response.statusText()}`);
  })
  .then(postResponse => {
    console.log("prospect added to prospects.json");
    console.log(postResponse);
  });
};

// calls
appointmentForm.addEventListener("submit", formSubmit);
copyright();