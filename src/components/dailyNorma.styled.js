import styled from 'styled-components';

export const GlobalStyles = styled.div`
  @media screen and (min-width: 768px) {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance: textfield;
    }
  }
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Modal = styled.div`
  background: var(--primery-color-white);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: relative;

  @media screen and (max-width: 319px) {
    padding: 24px 12px;
    max-width: 280px;
  }
  @media screen and (min-width: 320px) {
    padding: 24px 12px;
    max-width: 280px;
    max-height: 816px;
  }

  @media screen and (min-width: 768px) {
    padding: 32px 24px;
    max-width: 704px;
    max-height: 696px;
  }

  @media screen and (min-width: 1440px) {
    max-width: 592px;
    max-height: 712px;
  }
`;
export const TopDiv = styled.div`
  position: relative;
`;
export const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 4px;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: large;
  font-weight: 900;
  color: var(--primery-color-blue);
  transition: color 0.3s ease;

  &:hover {
    color: var(--btn-color-red);
  }
`;
export const ModalHeader = styled.div`
  color: var(--primery-color-black);
  line-height: 32px;
  font-size: 26px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
`;
export const FormulasBox = styled.div`
  margin-top: 24px;

  @media screen and (min-width: 768px) {
    display: flex;
  }
`;
export const FormulaBox = styled.div`
  display: flex;
  align-items: center;

  @media screen and (min-width: 768px) {
    margin-right: 24px;
  }
`;
export const LabelText = styled.div`
  color: var(--primery-color-black);
  font-size: 16px;
  line-height: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  `;
export const InputText = styled.div`
  color: var(--primery-color-black);
  font-size: 16px;
  line-height: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  margin-top: 16px;
`;
export const RequiredText = styled.div`
  color: var(--primery-color-black);
  font-size: 16px;
  line-height: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;

  @media screen and (min-width: 320px) {
    width: 190px;
  }
  @media screen and (min-width: 768px) {
    width: auto;
  }
`;


export const CaptionBox = styled.div`
  border: 1px solid var(--btn-color-light-blue);
  border-radius: 10px;
  padding: 10px;
  margin-top: 12px;
  width: 100%;

  @media screen and (min-width: 320px) {
    height: 100px;
  }

  @media screen and (min-width: 768px) {
    height: 52px;
  }
  @media screen and (min-width: 1440px) {
    height: 68px;
  }
`;
export const ColoredFormula = styled.div`
  color: var(--primery-color-blue);
  font-size: 18px;
  line-height: 24px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  margin-left: 4px;
`;
export const CaptionMark = styled.span`
  color: var(--primery-color-blue);
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`;
export const CaptionText = styled.div`
  color: #8F8F8F;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`;
export const FormBigText = styled.div`
  margin-top: 24px;
  color: var(--primery-color-black);
  line-height: 20px;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
`;
export const WaterFormInput = styled.input`
  height: 44px;
  width: 100%;
  outline: none;
  border: 1px solid var(--btn-color-light-blue);
  border-radius: 6px;
  color: var(--primery-color-blue);
  padding: 12px 10px;
  font-size: 16px;
  line-height: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  margin-top: 8px;
`;
export const WaterFormInputSpecial = styled.input`
  height: 44px;
  width: 100%;
  outline: none;
  border: 1px solid var(--btn-color-light-blue);
  border-radius: 6px;
  color: var(--primery-color-blue);
  padding: 12px 10px;
  font-size: 16px;
  line-height: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  margin-top: 16px;
`;
export const RequiredWaterBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;
export const RequiredWater = styled.div`
  color: var(--primery-color-blue);
  font-size: 18px;
  line-height: 24px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  margin-left: 6px;
`;
export const SaveButton = styled.button`
  border-radius: 10px;
  border: none;
  background-color: var(--primery-color-blue);
  color: var(--primery-color-white);
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(64, 123, 255, 0.34);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 14px rgba(64, 123, 255, 0.54);
    cursor: pointer;
  }

  &:focus {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }

  @media screen and (max-width: 319px) {
    width: calc( 100% - 24px);
    height: 36px;
    font-size: 16px;
    line-height: 20px;
    position: absolute;
    bottom: 24px;
  }
  @media screen and (min-width: 320px) {
    width: calc( 100% - 24px);
    height: 36px;
    font-size: 16px;
    line-height: 20px;
    position: absolute;
    bottom: 24px;
  }

  @media screen and (min-width: 768px) {
    width: 160px;
    height: 44px;
    font-size: 18px;
    line-height: 24px;
    position: absolute;
    right: 24px;
    bottom: 32px;
  }
`;
export const RadioButton = styled.div`
  input {
    display: none;
  }

  margin-top: 16px;

  label {
    display: inline-block;
    position: relative;
    padding-left: 22px;
    margin-right: 24px;
    cursor: pointer;
  }

  label::before {
    content: '';
    position: absolute;
    left: 0;
    top: 3px;
    width: 14px;
    height: 14px;
    border: 1px solid var(--primery-color-blue);
    border-radius: 50%;
    background-color: var(--primery-color-white);
    box-sizing: border-box;
  }

  label::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 7px;
    width: 6px;
    height: 6px;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    box-sizing: border-box;
  }

  input:checked + label::after {
    background-color: var(--primery-color-blue);
  }
`;

// DAILY NORMA PANEL

export const DailyNormaBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 20px;
  height: 76px;
  width: 164px;
  border-radius: 10px;
  border: 1px solid var(--bg-color-light-blue);
  box-shadow: 0 4px 8px 0 rgba(158, 187, 255, 0.12);
`;

export const DailyText = styled.div`
  font-family: 'Roboto', sans-serif;
  color: var(--primery-color-black);
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  width: 124px;
`;

export const RequiredWaterHeader = styled.div`
  font-family: 'Roboto', sans-serif;
  color: var(--primery-color-blue);
  font-weight: 900;
  line-height: 24px;
  font-size: 24px;
`;

export const BottomBox = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 0;
  margin-top: auto;
  width: 94px;
  height: 24px;
`;

export const EditWaterButton = styled.button`
  width: 28px;
  height: 20px;
  background-color: transparent;
  color: var(--secondary-color-blue);
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;

  &:hover {
    /* Add styling for hover state if needed */
  }
`;