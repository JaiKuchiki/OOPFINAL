function buttonClicked() {
  const country = document.getElementById("country_input").value;
  fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(response => response.json())
      .then(data => {
          displayCountries(data);
      })
      .catch(error => {
          document.getElementById("output").innerHTML = `<p>Error: ${error.message}</p>`;
      });
}

function filterByRegion(region) {
  const regionUrl = region ? `https://restcountries.com/v3.1/region/${region}` : 'https://restcountries.com/v3.1/all';

  fetch(regionUrl)
      .then(response => response.json())
      .then(data => {
          displayCountries(data);
      })
      .catch(error => {
          document.getElementById("output").innerHTML = `<p>Error: ${error.message}</p>`;
      });
}

function displayCountries(data) {
    const output = data.map(country => {
      const countryDetails = encodeURIComponent(JSON.stringify({
        name: country.name.common,
        capital: country.capital ? country.capital[0] : "N/A",
        population: country.population,
        region: country.region,
        languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
        flag: country.flags.png,
      }));
  
      return `
        <div class="country-card">
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <h3>${country.name.common}</h3>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Area:</strong> ${country.area ? country.area.toLocaleString() + " km²" : "N/A"}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Subregion:</strong> ${country.subregion}</p>
            <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
            <p><strong>Timezones:</strong> ${country.timezones.join(", ")}</p>
            <p><strong>Maps:</strong> <a href="${country.maps.googleMaps}" target="_blank">View on Google Maps</a></p>
            <p><strong>Location:</strong> ${country.latlng.join(", ")}</p>
            <img src="${country.coatOfArms.png}" alt="Coat of Arms of ${country.name.common}" width="100">
            <button><a href="index2.html?country=${countryDetails}">Plan Now</a></button>
        </div>
      `;
    }).join('');
    document.getElementById("output").innerHTML = output;
  }
  

function toggleDropdown() {
  const dropOptions = document.getElementById("drop-options");
  dropOptions.classList.toggle("show-options");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropdown, .dropdown *')) {
      const dropOptions = document.getElementById("drop-options");
      if (dropOptions.classList.contains('show-options')) {
          dropOptions.classList.remove('show-options');
      }
  }
};
