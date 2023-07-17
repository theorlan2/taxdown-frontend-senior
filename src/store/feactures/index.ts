import { combineReducers } from "@reduxjs/toolkit";
//
import auth from './auth/auth.slice';
import tax from './tax/tax.slice';

export default combineReducers({
    auth,
    tax
})