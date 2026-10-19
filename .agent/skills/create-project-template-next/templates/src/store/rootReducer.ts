import { combineReducers } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
  // Placeholder reducer to prevent "Store does not have a valid reducer" error
  app: (state = {}) => state,
});

export default rootReducer;
