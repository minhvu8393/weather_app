const searchField = document.getElementById('searchfield');
const submitBtn = document.getElementById('submitbtn');
const errorResult = document.getElementById('error');
const forecastResult = document.getElementById('forecastresult')

const getWeather = function(e) {
    e.preventDefault();
    const locationInput = searchField.value;
    fetch(`/?location=${locationInput}`)
    .then(response => response.json())
    .then(result => {
        if (!locationInput) {
            error = '<h2>Please provide a location</h2>'
            forecastResult.innerHTML = '';
            errorResult.innerHTML = '';
            errorResult.innerHTML += error;
        } else {
            if (!result.temperature) {
                error = `<h2>${result}</h2>`
                errorResult.innerHTML = '';
                errorResult.innerHTML += error;
            } else {
                result = `
                <li>Temperature: ${result.temperature}</li>
                <li>Feels Like: ${result.feelslike}</li>
                <li>${result.descriptions}</li>
                <li>Location: ${result.placename}</li>
                `;
                forecastResult.innerHTML = '';
                errorResult.innerHTML = '';
                forecastResult.innerHTML += result;
            }
        }
    })
}

submitBtn.addEventListener('click', getWeather);