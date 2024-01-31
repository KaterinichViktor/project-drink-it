import { createSelector } from '@reduxjs/toolkit';

const selectDailyNorma = (state) => state.dailyNorma;

export const selectDailyNormaData = createSelector(
  selectDailyNorma,
  (dailyNorma) => dailyNorma.data
);

export const selectDailyNormaLoading = createSelector(
  selectDailyNorma,
  (dailyNorma) => dailyNorma.loading
);

export const selectDailyNormaError = createSelector(
  selectDailyNorma,
  (dailyNorma) => dailyNorma.error
);
