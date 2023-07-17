import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
//
import { UserAuthData } from '@/store/feactures/auth/authState.model'

type Props = {
    userData?: UserAuthData
    logout: () => void;
}

const Header: FunctionComponent<Props> = (props) => {
    return (
        <header className='flex w-full shadow-sm mb-2 py-2' >
            <div className="container mx-auto">
                <div className="flex py-1 justify-between items-center">
                    <Link to={'/dashboard'} >
                        <img className='h-fit max-w-[200px]' alt='logo'   src={require('@/assets/img/taxdown_logo.png')} />
                    </Link>
                    <div className="cont-info-user flex">
                        <div className="user flex justify-center items-center">
                            <div className="avatar flex h-10 w-10 rounded-full bg-slate-300 justify-center items-center fill-slate-700 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <p className='name text-sm mx-2' >{props.userData && props.userData.name}</p>
                        </div>
                        <button onClick={props.logout} className='bg-green-400 rounded-sm px-4 ml-2 text-white'  >Logout</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;