import axios from 'axios';

const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json'
});

export default {
    all() {
        return api.get('/all');
    },
    listen(quotations = []) {
        return api.get(`/all/${quotations.join()}`)
    }
}