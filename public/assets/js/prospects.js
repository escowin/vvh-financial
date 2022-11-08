const requestsEl = document.getElementById('requests');

const displayProspects = prospectsArray => {
    for (let i = 0; i < prospectsArray.length; i++) {
        let id = i+1;
        let firstName = prospectsArray[i].firstName;
        let lastName = prospectsArray[i].lastName;
        let phoneNumber = prospectsArray[i].phoneNumber;
        let email = prospectsArray[i].email;

        const requestEl = document.createElement('article');
        requestEl.setAttribute = 'request';
        requestEl.innerHTML = `<p class='id'>${id}</p>
        <p class='first-name'>${firstName}</p>
        <p class='last-name'>${lastName}</p>
        <p class='phone-number'>${phoneNumber}</p>
        <p class='email'>${email}</p>`;

        requestsEl.appendChild(requestEl);
    }
};

const getProspects = (formData = {}) => {
    let queryUrl = '/api/prospects?';

    // Object.entries(formData).forEach(([key, value]) => {
    //     queryUrl += `${key}=${value}&`;
    // });
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