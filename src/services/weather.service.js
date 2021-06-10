import {http} from './http.service';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';

const getCurrentWeather = (capital, code) => {
    let params = '?q=' + capital + ',' + code + '&units=metric&appid=51362495186e49198d4fc4bc43e19d54'
    const request = http.get(baseUrl + params)
    return request.then(response => response.data)
}


const getForecast = (capital, code) => {
    let params = '?q=' + capital + ',' + code + '&units=metric&appid=51362495186e49198d4fc4bc43e19d54'
    const request = http.get(forecastUrl + params)
    return request.then(response => response.data)
}

export default {getCurrentWeather, getForecast}