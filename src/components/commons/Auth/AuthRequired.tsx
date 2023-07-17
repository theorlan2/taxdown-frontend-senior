import React, { FunctionComponent } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
//
import { useAuth } from '@/contexts/AuthContexts';

type Props = {
    children: JSX.Element
}

const AuthRequired: FunctionComponent<Props> = (props) => {
    let auth = useAuth();
    let location = useLocation();
    if (!auth.isLogged) {
        return <Navigate to="/" state={{ from: location }
        } replace />;
    }
    return props.children;

}

export default AuthRequired;