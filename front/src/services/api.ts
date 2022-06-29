import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// api.interceptors.response.use(
//   function (successRes) {
//     return successRes;
//   },
//   function (error) {
//     if (error.response && error.response.data) {
//       if (
//         error.response.data.message === 'Unauthorized' &&
//         error.response.data.statusCode === 401
//       ) {
//         localStorage.removeItem('@MATRICULAS:token');
//         localStorage.removeItem('@MATRICULAS:user');
//       }
//     }

//     return error;
//   },
// );

export default api;
