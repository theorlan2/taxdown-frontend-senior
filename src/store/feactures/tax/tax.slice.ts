import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
//
import { RootState } from '@/store';
import { Tax } from '@/models/tax/tax.model';
import { TaxState } from './taxState.model';
import { StatusFetch } from '@/models/enums';
import { Submissions, SubmissionsFormType } from '@/models/tax/submission.model';

const taxInitialState: TaxState = {
  taxes: [] as Tax[],
  submissionsForm: {} as SubmissionsFormType,
  submissions: [] as Submissions[],
  statusFetch: StatusFetch.SUCCESS,
  messageError: ""
}

export const taxSlice = createSlice({
  name: 'tax',
  initialState: taxInitialState,
  reducers: {
    saveTaxes: (state, payload: PayloadAction<Tax[]>) => {
      state.taxes = payload.payload;
    },
    statusTaxesFetch: (state, payload: PayloadAction<StatusFetch>) => {
      state.statusFetch = payload.payload;
      state.messageError = "";
    },
    statusTaxesErrorFetch: (state, payload: PayloadAction<string>) => {
      state.messageError = payload.payload;
    },
    saveSubmissionForm: (state, payload: PayloadAction<SubmissionsFormType>) => {
      state.submissionsForm = payload.payload;
    },
    saveSubmissions: (state, payload: PayloadAction<Submissions[]>) => {
      state.submissions = payload.payload;
    },
    saveSubmission: (state, payload: PayloadAction<Submissions>) => {
      state.submissions.push(payload.payload);
    },
    editSubmission: (state, payload: PayloadAction<Submissions>) => {
      state.submissions = state.submissions.map((element) => {
        if (element.id === payload.payload.id) {
          return { ...element, ...payload.payload };
        }
        return element;
      })
    },
    deleteSubmission: (state, payload: PayloadAction<string>) => {
      state.submissions = state.submissions.filter(item => item.id !== payload.payload);
    },
  }
});


export const {
  saveTaxes,
  statusTaxesFetch,
  saveSubmissionForm,
  saveSubmissions,
  saveSubmission,
  editSubmission,
  deleteSubmission
} = taxSlice.actions



// selectors
const taxSelector = (state: RootState) => state.tax;

export const selectTaxes = createSelector(
  taxSelector, state => state.taxes);

export const selectIsLoadingFetchTax = createSelector(
  taxSelector, state => state.statusFetch === StatusFetch.LOADING);

export const selectIsErrorFetchTax = createSelector(taxSelector, state => state.statusFetch === StatusFetch.ERROR);

export const selectSubmissionForm = createSelector(
  taxSelector, state => state.submissionsForm);



// reducer
export default taxSlice.reducer;