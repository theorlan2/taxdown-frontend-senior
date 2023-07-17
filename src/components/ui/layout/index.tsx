import React, { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom';
//
import { Auth } from '@/store/feactures/auth/authState.model';
import Header from './Header';

type Props = {
    fullHeight?: boolean;
    hiddenHeader?: boolean;
    userData?: Auth;
    logout: () => void;
}

const Layout: FunctionComponent<Props> = (props) => {

    return (
        <div>
            {!props.hiddenHeader && <Header logout={props.logout} userData={props.userData && props.userData.user} />}
            <main className={`flex w-full ${props.fullHeight && 'absolute h-full'}`} >
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;