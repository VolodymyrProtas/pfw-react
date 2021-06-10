import { http } from './http.service';
const baseUrl = 'http://localhost:3000/places';

const getAll = () => {
    const request = http.get(baseUrl);
    return request.then(response => response.data);
}

const getPlace = (id) => {
    const request = http.get(baseUrl + '/' + id);
    return request.then(response => response.data);
}

const addPlace = (newObject) => {
    const request = http.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const updatePlace = (newObject, id) => {
    const request = http.put(baseUrl + '/' + id, newObject);
    return request.then(response => response.data);
}

const deletePlace = (id) => {
    const request = http.delete(baseUrl + '/' + id);
    return request.then(response => response.data);
}

const deleteMultiplePlaces = (ids) => {
    let requests = [];
    ids.forEach((id) => {
        requests.push(http.delete(baseUrl + '/' + id));
    })
    const request = http.all(requests)
    return request.then(http.spread((...responses) => responses));
}

export default {getAll, getPlace, addPlace, updatePlace, deletePlace, deleteMultiplePlaces}