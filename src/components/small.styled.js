import styled from 'styled-components';

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