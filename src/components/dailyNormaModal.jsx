import React, { useState, useEffect, useRef } from 'react';
// import { saveDataToBackend, getStoredUserData } from './api';
import { getDailyNorma, updateDailyNorma } from '../Redux/auth/thunk';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../index.css';

import {
    ModalOverlay,
    Modal,
    TopDiv,
    CloseButton,
    ModalHeader,
    FormulasBox,
    FormulaBox,
    ColoredFormula,
    CaptionBox,
    CaptionText,
    CaptionMark,
    FormBigText,
    RadioButton,
    RequiredText,
    InputText,
    WaterFormInput,
    RequiredWaterBox,
    RequiredWater,
    SaveButton,
    LabelText,
  } from './dailyNorma.styled';



const DailyNormaModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [gender, setGender] = useState('woman');
  const [weight, setWeight] = useState(0);
  const [activityTime, setActivityTime] = useState(0);
  const [dailyNorma, setDailyNorma] = useState(2.0);
  const [willDrink, setWillDrink] = useState(0);

  const weightInputRef = useRef(null);
  const activityTimeInputRef = useRef(null);
  const willDrinkInputRef = useRef(null);

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    calculateDailyNorma();
  };

  const handleWeightChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setWeight(numericValue);
  };

  const handleActivityTimeChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setActivityTime(numericValue);
  };

  const handleWillDrinkChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setWillDrink(numericValue);
  };

  const handleWeightFocus = () => {
    if (parseFloat(weight) === 0) {
      weightInputRef.current.value = '';
    }
  };

  const handleActivityTimeFocus = () => {
    if (parseFloat(activityTime) === 0) {
      activityTimeInputRef.current.value = '';
    }
  };

  const handleWillDrinkFocus = () => {
    if (parseFloat(willDrink) === 0) {
      willDrinkInputRef.current.value = '';
    }
  };

  const handleWeightBlur = () => {
    if (weight === '' || parseFloat(weight) === 0) {
      weightInputRef.current.value = 0;
      setWeight(0);
    }
    calculateDailyNorma();
  };

  const handleActivityTimeBlur = () => {
    if (activityTime === '' || parseFloat(activityTime) === 0) {
      activityTimeInputRef.current.value = 0;
      setActivityTime(0);
    }
    calculateDailyNorma();
  };

  const handleWillDrinkBlur = () => {
    if (willDrink === '' || parseFloat(willDrink) === 0) {
      willDrinkInputRef.current.value = 0;
      setWillDrink(0);
    }
    calculateDailyNorma();
  };

  const calculateDailyNorma = () => {
    const userWeight = parseFloat(weight);
    const userActivity = parseFloat(activityTime);
    
    if (isNaN(userWeight) || isNaN(userActivity)) {
      setDailyNorma((2.0).toFixed(1));
      return;
    }

    const genderWeight = gender === 'woman' ? 0.03 : 0.04;
    const genderActivity = gender === 'woman' ? 0.4 : 0.6;
    let formulaResult = userWeight * genderWeight + userActivity * genderActivity;

    formulaResult = formulaResult === 0 ? 2.0 : formulaResult;

    // formulaResult = Math.min(formulaResult, 99);

    setDailyNorma(formulaResult > 99 ? 99 : formulaResult.toFixed(1));
  };

  useEffect(() => {
    calculateDailyNorma();
  }, [gender, weight, activityTime]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await dispatch(getDailyNorma());
        if (userData.payload) {
          setGender(userData.payload.gender || 'woman');
          setWeight(userData.payload.weight || 0);
          setActivityTime(userData.payload.activityTime || 0);
          setWillDrink(userData.payload.willDrink || 0);
          setDailyNorma(isNaN(userData.payload.dailyNorma) ? 2.0.toFixed(1) : userData.payload.dailyNorma);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, dispatch]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && e.button === 0) {
      onClose();
    }
  };

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const handleSave = () => {
    const requestData = {
      gender,
      weight: parseFloat(weight),
      activityTime: parseFloat(activityTime),
      willDrink: parseFloat(willDrink),
      dailyNorma: parseFloat(dailyNorma),
    };

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    dispatch(updateDailyNorma(requestData))
      .then((response) => {
        console.log('Data saved to the server:', response);
        onClose();
      })
      .catch((error) => {
        console.error('Error saving data to the server:', error);
        toast.error('There was an error saving data. Please try again.');
      });
  };

  if (!isOpen) {
    return null;
  }

  let displayAmount = dailyNorma;
  if (dailyNorma >= 99) {
    displayAmount = "99+";
  }

return (
    <ModalOverlay onMouseDown={handleBackdropClick}>
      <Modal>
        <TopDiv>
          <ModalHeader>My daily norma</ModalHeader>
          <CloseButton onClick={onClose}>&#10005;</CloseButton>
        </TopDiv>

        <FormulasBox>
          <FormulaBox>
            <LabelText>Female:</LabelText>
            <ColoredFormula>V=(M*0.03) + (T*0.4)</ColoredFormula>
          </FormulaBox>
          <FormulaBox>
            <LabelText>Male:</LabelText>
            <ColoredFormula>V=(M*0.04) + (T*0.6)</ColoredFormula>
          </FormulaBox>
        </FormulasBox>

        <CaptionBox>
          <CaptionText>
            <CaptionMark>*</CaptionMark> V is the volume of the water norm in liters per day, M is your body weight, T is the time
            of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)
          </CaptionText>
        </CaptionBox>

        <form>
          <FormBigText>Calculate your rate:</FormBigText>

          <RadioButton>
            <input
              type="radio"
              id="woman"
              name="gender"
              value="woman"
              checked={gender === 'woman'}
              onChange={() => handleGenderChange('woman')}
            />
            <label htmlFor="woman">
              <p className='label-text'>Female</p>
            </label>

            <input
              type="radio"
              id="man"
              name="gender"
              value="man"
              checked={gender === 'man'}
              onChange={() => handleGenderChange('man')}
            />
            <label htmlFor="man"> <p className='label-text'>Male</p></label>
          </RadioButton>

          <label>
            <InputText>Your weight in kilograms:</InputText>
          </label>
            <WaterFormInput
              type="text"
              value={weight}
              onChange={handleWeightChange}
              onFocus={handleWeightFocus}
              onBlur={handleWeightBlur}
              ref={weightInputRef}
              defaultValue={weight === 0 ? '' : weight}
              maxLength={5}

              onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
            />

          <label>
            <InputText>The time of active participation in sports or other activities with a high physical load in hours:</InputText>
          </label>
            <WaterFormInput
              type="text"
              value={activityTime}
              onChange={handleActivityTimeChange}
              onFocus={handleActivityTimeFocus}
              onBlur={handleActivityTimeBlur}
              ref={activityTimeInputRef}
              defaultValue={activityTime === 0 ? '' : activityTime}
              maxLength={5}

              onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
            />

          <RequiredWaterBox>
            <RequiredText>The required amount of water in liters per day:</RequiredText>
            <RequiredWater>{displayAmount} L</RequiredWater>
          </RequiredWaterBox>

          <FormBigText>Write down how much water you will drink:</FormBigText>
          <WaterFormInput
            type="text"
            value={willDrink}
            onChange={handleWillDrinkChange}
            onFocus={handleWillDrinkFocus}
            onBlur={handleWillDrinkBlur}
            ref={willDrinkInputRef}
            defaultValue={willDrink === 0 ? '' : willDrink}
            
            maxLength={5}
            
            onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
          />
          

          <SaveButton type="button" onClick={handleSave}>Save</SaveButton>
        </form>
      </Modal>
    </ModalOverlay>
  );
};

export default DailyNormaModal;