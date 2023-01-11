async function ctaFormHandler(e) {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const contact = document.querySelector('input[name="contact"]').value.trim();
    const clientText = document.getElementById('client-text').value.trim();

    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(phone)
    console.log(contact)
    console.log(clientText)
};

document.getElementById('cta-form').addEventListener('submit', ctaFormHandler);