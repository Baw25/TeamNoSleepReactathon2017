import { combineReducers } from 'redux';
import serverlessReducer from './serverlessReducer.js';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userLocation: userReducer,
  openTableList: serverlessReducer
});

export default rootReducer;