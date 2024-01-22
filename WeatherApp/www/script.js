const apiKey = '';

document.getElementById('search-button').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    resetUI();

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if(response.status === 404) {
                    updateUIForError('City not found. Please try another location.'); // Custom function to update the UI
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return; 
            }
            return response.json();
        })
        .then(data => {
            if (data) { // Check if the data object exists
                updateWeatherIcon(data);
            }
        })
        .catch(error => {
            console.error('Fetch error: -S', error);
            updateUIForError('An error occurred. Please try again later.'); // Custom function to update the UI
        });
});

function updateWeatherIcon(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const tempCelsius = data.main.temp; 
    const cityName = data.name;
    const weatherDescription = data.weather[0].description;

    document.getElementById('weather-icon').src = iconUrl;
    document.getElementById('weather-icon').alt = data.weather[0].description;
    document.getElementById('temperature').textContent = `${tempCelsius.toFixed(1)}°C`;
    document.getElementById('city-name').textContent = cityName;
    document.getElementById('weather-description').textContent = weatherDescription;
    document.getElementById('humidity').textContent = `${data.main.humidity}% Humidity`;
    // Convert wind speed from m/s to km/h by multiplying by 3.6
    document.getElementById('wind').textContent = `${(data.wind.speed * 3.6).toFixed(2)} km/h Wind Speed`;
}


function resetUI() {
    // Show the weather icon in case it was previously hidden
    document.getElementById('weather-icon').style.display = 'block';
    // Clear previous weather information
    document.getElementById('temperature').textContent = '';
    document.getElementById('city-name').textContent = '';
    document.getElementById('weather-description').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('wind').textContent = '';
}

function updateUIForError(message) {
    // Hide the weather icon
    document.getElementById('weather-icon').style.display = 'none';
    // Display the error message
    document.getElementById('city-name').textContent = message;
    // Hide or clear other weather information if needed
    document.getElementById('temperature').textContent = '';
    document.getElementById('weather-description').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('wind').textContent = '';
}
