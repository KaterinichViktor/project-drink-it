// const BASE_URL = 'your_backend_base_url';

// export const getStoredUserData = (data) => {
//   return new Promise((resolve, reject) => {
//     fetch(`${BASE_URL}/saveData`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then(response => response.json())
//       .then(data => {
//         resolve(data);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };
// export const saveDataToBackend = (data) => {
//   return new Promise((resolve, reject) => {
//     fetch(`${BASE_URL}/saveData`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then(response => response.json())
//       .then(data => {
//         resolve(data);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };



// // export const getCalculatedAmount = () => {
// //   return fetch(`${BASE_URL}/get-calculated-amount`)
// //     .then((response) => {
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! Status: ${response.status}`);
// //       }
// //       return response.json();
// //     })
// //     .then((data) => {
// //       return data.calculatedAmount;
// //     })
// //     .catch((error) => {
// //       console.error('Error fetching calculatedAmount:', error);
// //       throw error;
// //     });
// // };


router.get('/:id/dailynorma', authenticate, isValidId, ctrl.getDailyNormaData);
router.patch('/:id/dailynorma', authenticate, isValidId, ctrl.updateDailyNormaData);

// New Endpoints
router.get('/:id/dailynorma', authenticate, isValidId, ctrl.getDailyNormaData);
router.patch('/:id/dailynorma', authenticate, isValidId, validBody(schemas.updateDailyNormaDataSchema), ctrl.updateDailyNormaData);