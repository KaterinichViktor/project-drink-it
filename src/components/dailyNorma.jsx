import React, { useState, useEffect } from 'react';
import Modal from './dailyNormaModal';
import { getDailyNorma } from '../Redux/auth/thunk';
import { useDispatch } from 'react-redux';
import {
  DailyNormaBox,
  DailyText,
  RequiredWaterHeader,
  BottomBox,
  EditWaterButton,
} from './dailyNorma.styled';

const DailyNorma = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dailyNorma, setDailyNorma] = useState(2.0);

  useEffect(() => {
    dispatch(getDailyNorma())
      .then((userData) => {
        const fetchedDailyNorma = userData && userData.dailyNorma;
        const formattedAmount = (parseFloat(fetchedDailyNorma) || 2.0).toFixed(1);

        setDailyNorma(formattedAmount);
        // setDailyNorma((fetchedDailyNorma).toFixed(1));
        
      })
      .catch((error) => {
        console.error('Error getting dailyNorma:', error);
        setDailyNorma(2.0);
      });
  }, [dispatch]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  let displayAmount = dailyNorma;
  if (dailyNorma >= 99) {
    displayAmount = "99+";
  }

  return (
    <DailyNormaBox>
      <DailyText>My daily norma</DailyText>
      <BottomBox>
        <RequiredWaterHeader>{displayAmount} L</RequiredWaterHeader>
        <EditWaterButton onClick={handleModalOpen}>Edit</EditWaterButton>
      </BottomBox>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} />
    </DailyNormaBox>
  );
};

export default DailyNorma;
