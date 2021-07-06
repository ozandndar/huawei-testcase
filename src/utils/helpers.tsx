import axios from 'axios';

// on login
export const setAuthorizationToken = () => {
    axios.defaults.headers.common["Authorization"] = `apikey 6zRIZ8ux1vBlLFiCFj7T23:2tikV8lTgvTRV5d6MRgzmx`;
}

// on logout
export const deleteAuthorizationToken = () => {
    delete axios.defaults.headers.common['Authorization'];
}