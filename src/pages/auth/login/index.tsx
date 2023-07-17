import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//
import { RootState } from '@/store';
import { selectIsErrorFetchAuth, selectIsLoadingFetchAuth, selectMessageErrorFetchAuth } from '@/store/feactures/auth/auth.slice';
import { authSagasActions } from '@/services/sagas/auth/auth.actions';
//
import LoginForm from '@/pages/auth/login/components/loginForm/LoginForm';
import { LoginFormModel } from './models/login.model';

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

const LoginPage: FunctionComponent<Props> = (props) => {

    function submitLogin(dataForm: LoginFormModel) {
        props.dispatch({ type: authSagasActions.FETCH_AUTH_LOGIN, payload: dataForm })
    }

    return (
        <div className='flex justify-center items-center w-full h-full' >
            <div className='card-login bg-white shadow-lg px-4 py-6 w-80' >
                <h4 className='text-center font-medium my-2' >LOGIN</h4>
                <img className='w-full my-2' alt='logo App' src={require('@/assets/img/taxdown_logo.png')} />
                <LoginForm onSubmit={submitLogin} isLoading={props.isLoading}
                    haveError={props.haveErrorFetchAuth}
                    errorMessage={props.errorMessageFetchAuth} />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
