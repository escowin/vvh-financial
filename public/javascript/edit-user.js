async function editUserFormHandler(e) {
    e.preventDefault();

    const username = document.getElementById('edit-username').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const password = document.getElementById('edit-password').value.trim();

    console.log(username, email, password)
}

document.getElementById('edit-user-form').addEventListener('submit', editUserFormHandler);