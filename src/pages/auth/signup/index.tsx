import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//
import { RootState } from '@/store';
import { selectIsErrorFetchAuth, selectIsLoadingFetchAuth, selectMessageErrorFetchAuth } from '@/store/feactures/auth/auth.slice';
import SingUpForm from '@/pages/auth/signup/components/signUpForm/SingUpForm';
import { authSagasActions } from '@/services/sagas/auth/auth.actions';
import { SingUpModel } from './models/register.model';


interface StateProps {
    isLoading: boolean;
    haveErrorFetchAuth: boolean;
    errorMessageFetchAuth: string;
}

interface DispatchProps {
    dispatch: Dispatch
}

interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

const SingUpPage: FunctionComponent<Props> = (props) => {

    function submitSingUp(dataForm:  SingUpModel) {
        props.dispatch({ type: authSagasActions.FETCH_AUTH_SING_UP, payload: dataForm })
    }

    return (
        <div className='flex justify-center items-center w-full h-full' >
            <div className='card-login bg-white shadow-lg px-4 py-6 w-80' >
                <img className='w-full my-2' alt='logo app' src={require('@/assets/img/taxdown_logo.png')} />
                <h4 className='text-center font-bold text-xl mt-6 mb-4 ' >Sing up</h4>
                <SingUpForm isLoading={props.isLoading} haveError={props.haveErrorFetchAuth} errorMessage={props.errorMessageFetchAuth} onSubmit={submitSingUp} />
            </div>
        </div>
    );
}


const mapStateToProps = (state: RootState) => {
    return {
        isLoading: selectIsLoadingFetchAuth(state),
        statusAuthFetch: state.auth.statusFetch,
        haveErrorFetchAuth: selectIsErrorFetchAuth(state),
        errorMessageFetchAuth: selectMessageErrorFetchAuth(state)
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingUpPage);
