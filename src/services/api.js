import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://project-drink-it-backend.onrender.com',
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// ----------- auth-service -------------------

export const requestSignup = async body => {
  const { data } = await instance.post('/api/users/register', body);
  setToken(data.token);
  return data;
};

export const requestLogin = async body => {
  const { data } = await instance.post('/api/users/login', body);
  setToken(data.token);
  return data;
};

export const requestLogout = async () => {
  const { data } = await instance.post('/users/logout');
  return data;
};
export const requestRefreshUser = async () => {
  const { data } = await instance.get('/users/current');
  return data;
};

// ----------- dailynorma-service -------------------
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const getDailyNormaData = async () => {
    const { data } = await instance.get('/api/users/getDailyNorma');
    return data;
  };
  
  export const updateDailyNormaData = async (userData) => {
    const { data } = await instance.patch('/api/users/updateDailyNorma', userData);
    return data;
  };