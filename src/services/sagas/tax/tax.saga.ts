import { put, takeLatest, call } from "redux-saga/effects";
// 
import { Tax } from "@/models/tax/tax.model";
import { Submissions, SubmissionsFormFieldType, SubmissionsFormType } from "@/models/tax/submission.model";
import { ActionPayload } from "@/models/shared";
import { StatusFetch } from "@/models/enums";
import { saveSubmissionForm,saveSubmissions, saveTaxes, statusTaxesFetch } from "@/store/feactures/tax/tax.slice";
import { taxSagasActions } from "./tax.actions";
import fetchApi from "@/services/baseApi";


function* getTaxesData() {
    yield put(statusTaxesFetch(StatusFetch.LOADING));
    try {
        const response: Tax[] = yield call(fetchApi.get<Tax[]>, "/taxes") as any;
        yield put(saveTaxes(response));
        yield put(statusTaxesFetch(StatusFetch.SUCCESS));
    } catch (e: any) {
        yield put(statusTaxesFetch(StatusFetch.ERROR));
    }
}

function* getTaxSubmissionFormFields(action: ActionPayload<number>) {
    yield put(statusTaxesFetch(StatusFetch.LOADING));
    try {
        const response: SubmissionsFormType = yield call(fetchApi.get<SubmissionsFormType>, `/taxes/${action.payload}/form`) as any;
        yield put(saveSubmissionForm(response));
        yield put(statusTaxesFetch(StatusFetch.SUCCESS));
    } catch (e: any) {
        yield put(statusTaxesFetch(StatusFetch.ERROR));
    }
}

function* getTaxSubmissions(action: ActionPayload<number>) {
    yield put(statusTaxesFetch(StatusFetch.LOADING));
    try {
        const response: Submissions[] = yield call(fetchApi.get<Submissions[]>, `/taxes/${action.payload}/form`) as any;
        yield put(saveSubmissions(response));
        yield put(statusTaxesFetch(StatusFetch.SUCCESS));
    } catch (e: any) {
        yield put(statusTaxesFetch(StatusFetch.ERROR));
    }
}

function* sendTaxSubmissionFormFields(action: ActionPayload<SubmissionsFormFieldType>) {
    yield put(statusTaxesFetch(StatusFetch.LOADING));
    try {
        const response: SubmissionsFormType = yield call(fetchApi.post<SubmissionsFormFieldType, {}>, `/submissions`, action.payload) as any;
        yield put(saveSubmissionForm(response));
        yield put(statusTaxesFetch(StatusFetch.SUCCESS));
    } catch (e: any) {
        yield put(statusTaxesFetch(StatusFetch.ERROR));
    }
}

function* editTaxSubmissionFormFields(action: ActionPayload<SubmissionsFormFieldType>) {
    yield put(statusTaxesFetch(StatusFetch.LOADING));
    try {
        yield call(fetchApi.put<SubmissionsFormFieldType, {}>, `/submissions/${action.payload.id}`, action.payload) as any;
        yield put(statusTaxesFetch(StatusFetch.SUCCESS));
    } catch (e: any) {
        yield put(statusTaxesFetch(StatusFetch.ERROR));
    }
}

function* deleteTaxSubmission(action: ActionPayload<{ id: number }>) {
    yield put(statusTaxesFetch(StatusFetch.LOADING));
    try {
        yield call(fetchApi.delete<{ id: number }, {}>, `/submissions/${action.payload}`, action.payload) as any;
        yield put(statusTaxesFetch(StatusFetch.SUCCESS));
    } catch (e: any) {
        yield put(statusTaxesFetch(StatusFetch.ERROR));
    }
}

export default function* root(): Generator<any> {
    return [
        yield takeLatest<string, any>(taxSagasActions.FETCH_TAXES, getTaxesData),
        yield takeLatest<string, any>(taxSagasActions.FETCH_SUBMISSION_FORM_FIELDS, getTaxSubmissionFormFields),
        yield takeLatest<string, any>(taxSagasActions.FETCH_SUBMISSIONS, getTaxSubmissions),
        yield takeLatest<string, any>(taxSagasActions.FETCH_SEND_SUBMISSION_FORM_FIELDS, sendTaxSubmissionFormFields),
        yield takeLatest<string, any>(taxSagasActions.FETCH_EDIT_SUBMISSION_FORM_FIELDS, editTaxSubmissionFormFields),
        yield takeLatest<string, any>(taxSagasActions.FETCH_DELETE_SUBMISSION, deleteTaxSubmission),
    ];
}

