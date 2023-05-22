async function init() {
    const userInfoResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const userInfoData = await userInfoResponse.json();

    const bodyElement = document.body;

    const userInfo = createUserInfo(userInfoData);
    bodyElement.prepend(userInfo);
}

init();

function createUserInfo(data) {
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('user-info-wrapper');

    const name = data.name;
    const userName = data.username;
    const email = data.email;
    const street = data.address.street;
    const apartment = data.address.suite;
    const city = data.address.city;
    const zipCode = data.address.zipcode;
    const phone = data.phone;
    const website = data.website;
    const companyName = data.company.name;

    const h1Element = document.createElement('h2');
    h1Element.classList.add('user-name');
    h1Element.textContent = `${name} information:`;

    const userNameElement = document.createElement('p');
    userNameElement.classList.add('user-info-item');
    userNameElement.textContent = `Username: ${userName}`;

    const emailElement = document.createElement('p');
    emailElement.classList.add('user-info-item');
    emailElement.textContent = `Email: `;
    const linkToEmail = document.createElement('a');
    linkToEmail.href = `mailto:${email}`;
    linkToEmail.textContent = email;

    emailElement.append(linkToEmail);

    const addressElement = document.createElement('p');
    addressElement.classList.add('user-info-item');
    addressElement.textContent = 'Address: ';

    const linkToAddress = document.createElement('a');
    linkToAddress.href = `https://www.google.com/maps?q=${data.address.geo.lat},${data.address.geo.lng}`;
    linkToAddress.textContent = `${street}, ${apartment}, ${city}, ${zipCode}.`;

    addressElement.append(linkToAddress);

    const phoneElement = document.createElement('p');
    phoneElement.classList.add('user-info-item');
    phoneElement.textContent = 'Phone: ';
    const linkToPhone = document.createElement('a');
    linkToPhone.href = `tel:${phone}`
    linkToPhone.textContent = phone;

    phoneElement.append(linkToPhone);

    const websiteElement = document.createElement('p');
    websiteElement.classList.add('user-info-item');
    websiteElement.textContent = 'Website: ';
    const linkToWebsite = document.createElement('a');
    linkToWebsite.href = website;
    linkToWebsite.textContent = website;

    websiteElement.append(linkToWebsite);

    const companyElement = document.createElement('p');
    companyElement.classList.add('user-info-item');
    companyElement.textContent = `Work place: ${companyName}.`;

    userInfoDiv.append(h1Element, userNameElement, emailElement, addressElement, phoneElement, websiteElement, companyElement);

    return userInfoDiv;
}