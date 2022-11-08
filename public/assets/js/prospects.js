const requestsEl = document.getElementById('requests');

const displayProspects = prospectsArray => {
    for (let i = 0; i < prospectsArray.length; i++) {
        let id = i+1;
        let firstName = prospectsArray[i].firstName;
        let lastName = prospectsArray[i].lastName;
        let phoneNumber = prospectsArray[i].phoneNumber;
        let email = prospectsArray[i].email;

        const requestEl = document.createElement('article');
        requestEl.className = 'request';
        requestEl.innerHTML = `<p class='id'>${id}</p>
        <p class='name'>
            <span class='first-name'>${firstName}</span>
            <span class='last-name'>${lastName}</span>
        </p>
        <p class='email'>${email}</p>
        <p class='phone-number'>${phoneNumber}</p>`;

        requestsEl.appendChild(requestEl);
    }
};

const getProspects = (formData = {}) => {
    let queryUrl = '/api/prospects?';

    Object.entries(formData).forEach(([key, value]) => {
        queryUrl += `${key}=${value}&`;
    });
    // console.log(queryUrl)

    fetch(queryUrl)
        .then(response => {
            if (!response.ok) {
                return alert(`error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(prospectsData => {
            console.log(prospectsData);
            displayProspects(prospectsData);
        });
};

getProspects();