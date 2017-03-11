import { combineReducers } from 'redux';
import serverless from './serverlessReducer.js';

const rootReducer = combineReducers({
  serverless
});

export default rootReducer;