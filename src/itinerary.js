const urlParams = new URLSearchParams(window.location.search);
const countryData = JSON.parse(decodeURIComponent(urlParams.get('country')));

const countryDetailsDiv = document.getElementById('country-details');
countryDetailsDiv.innerHTML = `
    <h1>${countryData.name}</h1>
    <img src="${countryData.flag}" alt="Flag of ${countryData.name}">
    <p><strong>Capital:</strong> ${countryData.capital}</p>
    <p><strong>Population:</strong> ${countryData.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${countryData.region}</p>
    <p><strong>Languages:</strong> ${countryData.languages}</p>
`;

document.getElementById('country').value = countryData.name;

let editIndex = null;

function saveItinerary() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const details = document.getElementById('details').value;

    const itinerary = { country, city, details };
    let itineraries = JSON.parse(localStorage.getItem('itineraries')) || [];

    if (editIndex === null) {
        itineraries.push(itinerary);
    } else {
        itineraries[editIndex] = itinerary;
        editIndex = null;
    }

    localStorage.setItem('itineraries', JSON.stringify(itineraries));
    displayItineraries();
    clearForm();
}

function displayItineraries() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    const itineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
    
    itineraries
        .filter(itinerary => itinerary.country === countryData.name)
        .forEach((itinerary, index) => {
            const card = document.createElement('div');
            card.classList.add('itinerary-card');
            card.innerHTML = `
                <h3>${itinerary.country} - ${itinerary.city}</h3>
                <p>${itinerary.details}</p>
                <button onclick="editItinerary(${index})">Edit</button>
                <button onclick="deleteItinerary(${index})">Delete</button>
            `;
            container.appendChild(card);
        });
}

function deleteItinerary(index) {
    let itineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
    itineraries.splice(index, 1);
    localStorage.setItem('itineraries', JSON.stringify(itineraries));
    displayItineraries(); 
}

function editItinerary(index) {
    const itineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
    const itinerary = itineraries[index];
    
    document.getElementById('country').value = itinerary.country;
    document.getElementById('city').value = itinerary.city;
    document.getElementById('details').value = itinerary.details;

    editIndex = index;
}

function clearForm() {
    document.getElementById('city').value = '';
    document.getElementById('details').value = '';
    editIndex = null;
}

window.onload = displayItineraries;
