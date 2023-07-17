import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom';
import { useForm, } from 'react-hook-form';
import { LoginFormModel } from '@/pages/auth/login/models/login.model'

type Props = {
    isLoading: boolean;
    haveError: boolean;
    errorMessage: string;
    onSubmit: (dataForm: LoginFormModel) => void;
}


const LoginForm: FunctionComponent<Props> = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormModel>();

    function submit(data: LoginFormModel) {
        props.onSubmit(data);
    }

    return (
        <div className='login-form w-full' >
            <form onSubmit={handleSubmit(submit)} className='flex flex-col' >
                <input
                    className='p-2 mt-2 mb-1 w-full border-2 rounded-sm border-zinc-500'
                    placeholder='email@example.com'
                    id="inputEmail"
                    {...register('email', { required: true })} />
                {errors.email && <span id={'errorInputEmail'} className='text-xs text-red-400 ' >The field Email is required</span>}

                <input
                    className='p-2 mt-2 mb-1 w-full border-2 rounded-sm border-zinc-500'
                    placeholder='Password'
                    type='password'
                    id={'inputPassword'}
                    {...register('password', { required: true })} />
                {errors.password && <span id={'errorInputPassword'} className='text-xs text-red-400 ' >The field password is required</span>}

                <button disabled={props.isLoading} className='p-2 bg-green-400 text-gray-700 font-bold uppercase rounded-sm mx-0 mt-3' type='submit' >Enter</button>
                <div className="flex flex-col text-center mt-4">
                    <p>You do not have an account ? </p>
                    <Link className=' text-green-400 rounded-sm mx-2' type='submit' to={'/singup'}  >Sign up</Link>
                </div>
                {props.haveError && <div className='mt-2 p-2 bg-red-300 ' >
                    <p className=' text-black text-xs ' >{props.errorMessage}</p>
                </div>
                }
            </form>
        </div>
    )
}

export default LoginForm;