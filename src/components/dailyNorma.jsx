import React, { useState, useEffect } from 'react';
import Modal from './dailyNormaModal';
import { getCalculatedAmount } from './api';

const DailyNorma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState(null);

  useEffect(() => {
    // Fetch calculatedAmount when the component mounts
    getCalculatedAmount()
      .then((amount) => {
        const formattedAmount = (parseFloat(amount) || 2.0).toFixed(1);
        setCalculatedAmount(formattedAmount);
      })
      .catch((error) => {
        console.error('Error getting calculatedAmount:', error);
        // Set calculatedAmount to '2.0' by default if fetching fails
        setCalculatedAmount('2.0');
      });
  }, []);// Пустий масив, щоб ефект виконувався тільки при монтуванні компонента

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='daily-norma-box'>
      <p className='daily-text'>My daily norma</p>
      <div className='bottom-box'>
        <h2 className='required-water-header'>{calculatedAmount} L</h2>
        <button onClick={handleModalOpen} className='edit-water-btn'>Edit</button>
      </div>


      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default DailyNorma;
