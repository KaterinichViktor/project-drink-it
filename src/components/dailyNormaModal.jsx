// import React, { useState, useEffect } from 'react';
// import { saveDataToBackend, getStoredUserData } from './api';
// import '../css/custom-radio.css';

// const DailyNormaModal = ({ isOpen, onClose }) => {
//   const [gender, setGender] = useState('');
//   const [weight, setWeight] = useState('');
//   const [activityTime, setActivityTime] = useState('');
//   const [calculatedAmount, setCalculatedAmount] = useState(2.0);
//   const [userAmount, setUserAmount] = useState('');
import React, { useState, useEffect } from 'react';
import { saveDataToBackend, getStoredUserData } from './api';
import '../css/custom-radio.css';

const DailyNormaModal = ({ isOpen, onClose }) => {
  const [gender, setGender] = useState('female'); // Set to 'female' by default
  const [weight, setWeight] = useState(0);
  const [activityTime, setActivityTime] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState(2.0);
  const [userAmount, setUserAmount] = useState(0);

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
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

  const handleWeightBlur = () => {
    calculateAmount();
  };

  const handleActivityTimeBlur = () => {
    calculateAmount();
  };

  const handleUserAmountBlur = () => {
    calculateAmount();
  };

  const calculateAmount = () => {
    const userWeight = parseFloat(weight);
    const userActivity = parseFloat(activityTime);
    const genderWeight = gender === 'female' ? 0.03 : 0.04;
    const genderActivity = gender === 'female' ? 0.4 : 0.6;
    const formulaResult = userWeight * genderWeight + userActivity * genderActivity;

    setCalculatedAmount((formulaResult === 0 ? 0 : formulaResult).toFixed(1));
  };

  useEffect(() => {
    calculateAmount();
  }, [gender, weight, activityTime, userAmount]);

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

  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const userData = await getStoredUserData();
        if (userData) {
          setGender(userData.gender || 'female'); // Set to 'female' by default
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
  

  // useEffect(() => {
  //   const calculateAmount = () => {
  //     const userWeight = parseFloat(weight);
  //     const userActivity = parseFloat(activityTime);
  //     const genderWeight = gender === 'female' ? 0.03 : 0.04;
  //     const genderActivity = gender === 'female' ? 0.4 : 0.6;
  //     const formulaResult = (userWeight * genderWeight) + (userActivity * genderActivity);

  //     // console.log('formulaResult:', formulaResult);
  //     setCalculatedAmount((formulaResult === 0 ? calculatedAmount : formulaResult).toFixed(1));
  //   };

  //   calculateAmount();
  // }, [gender, weight, activityTime]);
  

  const handleSave = () => {
    const requestData = {
      gender,
      weight: parseFloat(weight),
      activityTime: parseFloat(activityTime),
      userAmount: parseFloat(userAmount),
      calculatedAmount: parseFloat(calculatedAmount),
    };

    saveDataToBackend(requestData)
      .then((response) => {
        console.log('Дані збережено на сервері:', response);
        onClose();
      })
      .catch((error) => {
        console.error('Помилка збереження на сервері:', error);
        alert('Виникла помилка при збереженні даних. Будь ласка, спробуйте знову.');
      });
  };

  if (!isOpen) {
    return null;
  }
  
  

  return (
    <div className='modal-overlay' onMouseDown={handleBackdropClick}>
      <div className="modal">
        <div className='top-div'>
          <h2 className='modal-header'>My daily norma</h2>
          <button type="button" onClick={onClose} className='close-btn'>Close</button>
        </div>   
      
              
          <div className='info-box'>
            <div className='formulas-box'>
              <div className='formula-box'>
                <p className='formula-text'>For woman:</p><p> V=(M*0,03) + (T*0,4)</p>
              </div>
              <div className='formula-box'>
                <p className='formula-text'>For man:</p><p> V=(M*0,04) + (T*0,6)</p>
              </div>
            </div>

            <div className='caption-box'>
              <p className='caption-text'> <span className='caption-mark'>*</span> V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)</p>
            </div>  
          </div>

          <form className='water-form'>
            <h3 className='form-big-text'>Calculate your rate:</h3>
              <div className="radio-button">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => {
                    handleGenderChange('female');
                    calculateAmount(); // Recalculate when the radio changes
                  }}
                />
                <label htmlFor="female">
                  <p className='radio-text'>For female</p>
                </label>

                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => {
                    handleGenderChange('male');
                    calculateAmount(); // Recalculate when the radio changes
                  }}
                />
                <label htmlFor="male"> <p className='radio-text'>For man</p></label>
              </div>
            
            {/* <label className='input-text'>Your weight in kilograms:</label>
            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="0" className='water-form-input'/>

            <label className='input-text'>The time of active participation in sports or other activities with a high physical. load in hours:</label>
            <input type="text" value={activityTime} onChange={(e) => setActivityTime(e.target.value)} className='water-form-input' />

            <p className='input-text'>The required amount of water in liters per day: <h3 className='required-water'>{calculatedAmount} L</h3></p>

            <h3 className='form-big-text'>Write down how much water you will drink:</h3>
            <input type="text" value={userAmount} onChange={(e) => setUserAmount(e.target.value)} className='water-form-input' /> */}
            <label className='input-text'>Your weight in kilograms:</label>
            <input
              type="text"
              value={weight}
              onChange={handleWeightChange}
              onBlur={handleWeightBlur}
              placeholder="0"
              className='water-form-input'
            />

            <label className='input-text'>The time of active participation in sports or other activities with a high physical. load in hours:</label>
            <input
              type="text"
              value={activityTime}
              onChange={handleActivityTimeChange}
              onBlur={handleActivityTimeBlur}
              placeholder="0"
              className='water-form-input'
            />

            <p className='input-text'>The required amount of water in liters per day: <h3 className='required-water'>{calculatedAmount} L</h3></p>

            <h3 className='form-big-text'>Write down how much water you will drink:</h3>
            <input
              type="text"
              value={userAmount}
              onChange={handleUserAmountChange}
              onBlur={handleUserAmountBlur}
              placeholder="0"
              className='water-form-input'
            />

            <button type="button" onClick={handleSave} className='save-btn'>Save</button>
          </form>

          
      </div>
    </div>
  );
};

export default DailyNormaModal;
