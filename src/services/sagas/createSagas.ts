import { all } from 'redux-saga/effects';
//
import AuthSagas from './auth/auth.saga';
import TaxSagas from './tax/tax.saga';

export default function* root() {
    yield all([
        TaxSagas(),
        AuthSagas(),
    ]);
}