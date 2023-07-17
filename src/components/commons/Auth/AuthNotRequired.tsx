import React, { FunctionComponent } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
//
import { useAuth } from '@/contexts/AuthContexts';

type Props = {
    children: JSX.Element
}

const AuthNotRequired: FunctionComponent<Props> = (props) => {
    let auth = useAuth();
    let location = useLocation();
    if (auth.isLogged) {
        return <Navigate to="/dashboard" state={{ from: location }
        } replace />;
    }
    return props.children;

}

export default AuthNotRequired;