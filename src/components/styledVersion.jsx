import React, { useState, useEffect, useRef } from 'react';
import { saveDataToBackend, getStoredUserData } from './api';
import '../css/styles.css';
import {
    ModalOverlay,
    Modal,
    TopDiv,
    CloseButton,
    ModalHeader,
    FormulasBox,
    FormulaBox,
    FormulaText,
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
  } from './all.styled';

const DailyNormaModal = ({ isOpen, onClose }) => {
  const [gender, setGender] = useState('woman');
  const [weight, setWeight] = useState(0);
  const [activityTime, setActivityTime] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState(2.0);
  const [userAmount, setUserAmount] = useState(0);

  const weightInputRef = useRef(null);
  const activityTimeInputRef = useRef(null);
  const userAmountInputRef = useRef(null);

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    calculateAmount();
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleActivityTimeChange = (e) => {
    setActivityTime(e.target.value);
  };

  const handleUserAmountChange = (e) => {
    setUserAmount(e.target.value);
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

  const handleUserAmountFocus = () => {
    if (parseFloat(userAmount) === 0) {
      userAmountInputRef.current.value = '';
    }
  };

  const handleWeightBlur = () => {
    if (weight === '' || parseFloat(weight) === 0) {
      weightInputRef.current.value = 0;
      setWeight(0);
    }
    calculateAmount();
  };

  const handleActivityTimeBlur = () => {
    if (activityTime === '' || parseFloat(activityTime) === 0) {
      activityTimeInputRef.current.value = 0;
      setActivityTime(0);
    }
    calculateAmount();
  };

  const handleUserAmountBlur = () => {
    if (userAmount === '' || parseFloat(userAmount) === 0) {
      userAmountInputRef.current.value = 0;
      setUserAmount(0);
    }
    calculateAmount();
  };

  const calculateAmount = () => {
    const userWeight = parseFloat(weight);
    const userActivity = parseFloat(activityTime);
    
    if (isNaN(userWeight) || isNaN(userActivity)) {
      setCalculatedAmount((2.0).toFixed(1));
      return;
    }

    const genderWeight = gender === 'woman' ? 0.03 : 0.04;
    const genderActivity = gender === 'woman' ? 0.4 : 0.6;
    let formulaResult = userWeight * genderWeight + userActivity * genderActivity;

    formulaResult = formulaResult === 0 ? 2.0 : formulaResult;

    setCalculatedAmount(formulaResult.toFixed(1));
  };

  useEffect(() => {
    calculateAmount();
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
    const fetchDataFromDatabase = async () => {
      try {
        const userData = await getStoredUserData();
        if (userData) {
          setGender(userData.gender || 'woman');
          setWeight(userData.weight || 0);
          setActivityTime(userData.activityTime || 0);
          setUserAmount(userData.userAmount || 0);
          setCalculatedAmount(isNaN(userData.calculatedAmount) ? 2.0 : userData.calculatedAmount);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isOpen) {
      fetchDataFromDatabase();
    }
  }, [isOpen]);

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
      userAmount: parseFloat(userAmount),
      calculatedAmount: parseFloat(calculatedAmount),
    };

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    saveDataToBackend(requestData)
      .then((response) => {
        console.log('Data saved to the server:', response);
        onClose();
      })
      .catch((error) => {
        console.error('Error saving data to the server:', error);
        alert('There was an error saving data. Please try again.');
      });
  };

  if (!isOpen) {
    return null;
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
            <FormulaText>For woman:</FormulaText>
            <ColoredFormula>V=(M*0.03) + (T*0.4)</ColoredFormula>
          </FormulaBox>
          <FormulaBox>
            <FormulaText>For man:</FormulaText>
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
              <p className='radio-text'>For woman</p>
            </label>

            <input
              type="radio"
              id="man"
              name="gender"
              value="man"
              checked={gender === 'man'}
              onChange={() => handleGenderChange('man')}
            />
            <label htmlFor="man"> <p className='radio-text'>For man</p></label>
          </RadioButton>

          <label>
            <InputText>Your weight in kilograms:</InputText>
            <WaterFormInput
              type="number"
              value={weight}
              onChange={handleWeightChange}
              onFocus={handleWeightFocus}
              onBlur={handleWeightBlur}
              ref={weightInputRef}
              defaultValue={weight === 0 ? '' : weight}
            />
          </label>

          <label>
            <InputText>The time of active participation in sports or other activities with a high physical load in hours:</InputText>
            <WaterFormInput
              type="number"
              value={activityTime}
              onChange={handleActivityTimeChange}
              onFocus={handleActivityTimeFocus}
              onBlur={handleActivityTimeBlur}
              ref={activityTimeInputRef}
              defaultValue={activityTime === 0 ? '' : activityTime}
            />
          </label>

          <RequiredWaterBox>
            <RequiredText>The required amount of water in liters per day:</RequiredText>
            <RequiredWater>{calculatedAmount} L</RequiredWater>
          </RequiredWaterBox>

          <FormBigText>Write down how much water you will drink:</FormBigText>
          <WaterFormInput
            type="number"
            value={userAmount}
            onChange={handleUserAmountChange}
            onFocus={handleUserAmountFocus}
            onBlur={handleUserAmountBlur}
            ref={userAmountInputRef}
            defaultValue={userAmount === 0 ? '' : userAmount}
            className='water-form-input-special'
          />

          <SaveButton type="button" onClick={handleSave}>Save</SaveButton>
        </form>
      </Modal>
    </ModalOverlay>
  );
};

export default DailyNormaModal;