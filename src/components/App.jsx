// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };


import React from 'react';
import DailyNorma from './dailyNorma';

const App = () => {
  return (
    <div>
      <h1>Your Water Consumption App</h1>
      <DailyNorma />
    </div>
  );
};

export default App;

