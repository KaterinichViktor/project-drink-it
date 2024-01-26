// import { createSlice } from '@reduxjs/toolkit';

// export const homepageSlice = createSlice({
//   name: 'userWater',
//   initialState: {
//     userGender: [],
//     userWeight: '',
//     userActivityHours: '',
//     userWater: '',
//     userRequiredWater: '',
//   },
//   reducers: {
//     addContact: (state, action) => {
//       state.items = state.items.concat(action.payload);
//     },
//     deleteContact: (state, action) => {
//       state.items = state.items.filter((contact) => contact.id !== action.payload);
//     },
//     updateFilter: (state, action) => {
//       state.filter = action.payload;
//     },
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },
//     setUserEmail: (state, action) => {
//       state.userEmail = action.payload;
//     },
//     setUserNickname: (state, action) => {
//       state.userNickname = action.payload;
//     },
//     logoutUser: (state) => {
//       state.token = '';
//       state.userEmail = '';
//       // state.userNickname = '';
//     },
//   },
// });

// export const {
//   addContact,
//   deleteContact,
//   updateFilter,
//   setToken,
//   setUserEmail,
//   setUserNickname,
//   logoutUser
// } = contactsSlice.actions;

// export const selectContacts = (state) => state.contacts.items;
// export const selectFilter = (state) => state.contacts.filter;
// export const selectToken = (state) => state.contacts.token;
// export const selectUserEmail = (state) => state.contacts.userEmail;
// export const selectUserNickname = (state) => state.contacts.userNickname;

// export default contactsSlice.reducer;