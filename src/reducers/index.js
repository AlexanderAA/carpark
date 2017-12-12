import { combineReducers } from 'redux';
import carpark from './carpark';

const carparkReducer = combineReducers({ 'carpark': carpark });

export default carparkReducer;
