import axios from 'utils/axios';

export const addProjectApi = (data) => {
    return axios.post('/project/create', data);

}

export const listProjectPlacesApi = () => {
    return axios.get('/places/index');
}