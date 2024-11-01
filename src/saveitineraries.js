function loadItineraries() {
    const container = document.getElementById('itineraries-container');
    container.innerHTML = '';

    const itineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
    
    if (itineraries.length === 0) {
        container.innerHTML = '<p>No saved itineraries yet.</p>';
    } else {
        itineraries.forEach((itinerary, index) => {
            const card = document.createElement('div');
            card.classList.add('itinerary-card');
            card.innerHTML = `
                <h3>${itinerary.country} - ${itinerary.city}</h3>
                <p><strong>Details:</strong> ${itinerary.details}</p>
                <button onclick="editItinerary(${index})">Edit</button>
                <button onclick="deleteItinerary(${index})">Delete</button>
            `;
            container.appendChild(card);
        });
    }
}

function editItinerary(index) {
    const itineraries = JSON.parse(localStorage.getItem('itineraries')) || [];

    const newCity = prompt("Enter new city name:", itineraries[index].city);
    const newDetails = prompt("Enter new details:", itineraries[index].details);

    if (newCity && newDetails) {
        itineraries[index].city = newCity;
        itineraries[index].details = newDetails;

        localStorage.setItem('itineraries', JSON.stringify(itineraries));

        loadItineraries();
    }
}

function deleteItinerary(index) {
    const itineraries = JSON.parse(localStorage.getItem('itineraries')) || [];

    const confirmDelete = confirm("Are you sure you want to delete this itinerary?");
    if (confirmDelete) {
        itineraries.splice(index, 1);

        localStorage.setItem('itineraries', JSON.stringify(itineraries));
        
        loadItineraries();
    }
}

window.onload = loadItineraries;
