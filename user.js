async function init() {
    const userInfoResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const userInfoData = await userInfoResponse.json();

    const bodyElement = document.body;

    const userInfo = createUserInfo(userInfoData);
    bodyElement.prepend(userInfo);
}

init();

function createUserInfo(data) {
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('user-info-wrapper');
    for (let i = 0; i < 1; i++) {
        const name = data[0].name;
        const userName = data[0].username;
        const email = data[0].email;
        const street = data[0].address.street;
        const apartment = data[0].address.suite;
        const city = data[0].address.city;
        const zipCode = data[0].address.zipcode;
        const phone = data[0].phone;
        const website = data[0].website;
        const companyName = data[0].company.name;

        const h1Element = document.createElement('h2');
        h1Element.classList.add('user-name');
        h1Element.textContent = `${name} information:`;

        const userInfoList = document.createElement('ul');

        const userNameElement = document.createElement('li');
        userNameElement.classList.add('user-info-item');
        userNameElement.textContent = `Username: ${userName}`;

        const emailElement = document.createElement('li');
        emailElement.classList.add('user-info-item');
        emailElement.textContent = `Email: ${email}`;

        const addressElement = document.createElement('li');
        addressElement.classList.add('user-info-item');
        addressElement.textContent = 'Address: ';

        const linkToAddress = document.createElement('a');
        linkToAddress.href = `https://www.google.com/maps?q=${data[0].address.geo.lat},${data[0].address.geo.lng}`;
        linkToAddress.textContent = `${street}, ${apartment}, ${city}, ${zipCode}.`

        addressElement.append(linkToAddress);

        const phoneElement = document.createElement('li');
        phoneElement.classList.add('user-info-item');
        phoneElement.textContent = `Phone: ${phone}`;

        const websiteElement = document.createElement('li');
        websiteElement.classList.add('user-info-item');
        websiteElement.textContent = `Website: ${website}`;

        const companyElement = document.createElement('li');
        companyElement.classList.add('user-info-item');
        companyElement.textContent = `Work place: ${companyName}.`;



        userInfoList.append(userNameElement, emailElement, addressElement, phoneElement, websiteElement, companyElement);
        userInfoDiv.append(h1Element, userInfoList);

    }

    return userInfoDiv;
}