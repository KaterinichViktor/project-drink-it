// Припустимо, що ваш бекенд приймає POST-запити за цим шляхом
const BASE_URL = 'your_backend_base_url'; // Замініть на URL вашого бекенду


// const publicCalculatedAmount = 

export const getStoredUserData = (data) => {
  return new Promise((resolve, reject) => {
    // Відправити дані на бекенд
    fetch(`${BASE_URL}/saveData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const saveDataToBackend = (data) => {
  return new Promise((resolve, reject) => {
    // Відправити дані на бекенд
    fetch(`${BASE_URL}/saveData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};


// Функція для отримання calculatedAmount з сервера
export const getCalculatedAmount = () => {
  return fetch(`${BASE_URL}/get-calculated-amount`) // Припустимо, що ваш бекенд має ендпоінт /get-calculated-amount
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.calculatedAmount; // Припустимо, що сервер повертає об'єкт, який містить calculatedAmount
    })
    .catch((error) => {
      console.error('Error fetching calculatedAmount:', error);
      throw error; // Прокидуємо помилку для подальшого оброблення в компоненті
    });
};
