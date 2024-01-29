export const selectTodayWater = state => state.waterDetails.today;
export const selectMonthWater = state => state.waterDetails.month;
export const selectDailyNorm = state => state.waterDetails.today.dailyNorm;
export const selectWaterRate = state => state.waterDetails.today.waterRate;