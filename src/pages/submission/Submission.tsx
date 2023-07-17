import React, { FunctionComponent, useEffect, useState } from 'react'
import { Dispatch } from '@reduxjs/toolkit';
import { connect, useDispatch } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';

//
import { RootState } from '@/store';
import { taxSagasActions } from '@/services/sagas/tax/tax.actions';
import { saveSubmission, selectIsErrorFetchTax, selectIsLoadingFetchTax, selectSubmissionForm } from '@/store/feactures/tax/tax.slice';
import { Submissions, SubmissionsFormType } from '@/models/tax/submission.model';
import InformationDialog from '@/components/commons/Dialogs/InformationDialog';
import { TypeDialogs } from '@/models/enums/typeDialogs';
import SubmissionForm from './components/SubmissionForm/SubmissionForm';

type Props = {
    submissionForm: SubmissionsFormType;
    submissions: Submissions[];
    isLoading: boolean;
    haveErrorFetch: boolean;
}

const SubmissionFormPage: FunctionComponent<Props> = (props) => {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataForm, setDataForm] = useState({} as Submissions);

    useEffect(() => {
        function getSubmission(id: string): Submissions | undefined {
            return props.submissions.find(item => item.id === id);
        }

        dispatch({ type: taxSagasActions.FETCH_SUBMISSION_FORM_FIELDS, payload: params.id });
        if (params.idSubmission) {
            const submission = getSubmission(params.idSubmission);
            if(submission){
                setDataForm(prev => ({ ...prev, ...submission  }));
            }
        } else {
            setDataForm(prev => ({ ...prev,  }));
        }
    }, [dispatch, params.id, params.idSubmission, props.submissions])


    function onSubmitForm(data: Submissions) {
        dispatch(saveSubmission(data));
         dispatch({ type: taxSagasActions.FETCH_SEND_SUBMISSION_FORM_FIELDS, payload: data })
        navigate('/')
    }

    return (
        <div className='submission flex justify-center items-center w-full h-full' >
            <div className="container mx-auto">
                <div className="cont-form mx-auto max-w-screen-sm border-2 p-2 rounded">
                    <SubmissionForm idTax={params.id} submissionForm={props.submissionForm}  submission={dataForm} onSubmit={onSubmitForm} />          
                </div>
            </div>
            <InformationDialog isOpen={props.isLoading} title={'Loading information form server...'} description={'Send data to server.'} type={TypeDialogs.loading} textOnCancelButton={''} textOnAcceptButton={''} closeModal={() => { }} />
        </div>
    )
}
 
const mapStateToProps = (state: RootState) => {
    return {
        submissionForm: selectSubmissionForm(state),
        submissions: state.tax.submissions,
        isLoading: selectIsLoadingFetchTax(state),
        haveErrorFetch: selectIsErrorFetchTax(state),
    }
} 

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionFormPage);
