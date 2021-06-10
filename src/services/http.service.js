import axios from 'axios'

let instance = axios.create();

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    alert('Request failed!' + error.message ? error.message : '');
    return Promise.reject(error);
});

instance.all = (promises) => {
    return Promise.all(promises);
};

instance.spread = (callback) => {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
};

export const http = instance