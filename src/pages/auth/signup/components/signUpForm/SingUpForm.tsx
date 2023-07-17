import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SingUpModel } from '../../models/register.model';

type Props = {
    isLoading: boolean;
    haveError: boolean;
    errorMessage: string;
    onSubmit: (dataForm: SingUpModel) => void;
}


const SingUpForm: FunctionComponent<Props> = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<SingUpModel>();

    function submit(data: SingUpModel) {
        props.onSubmit(data);
    }

    return (
        <div className='login-form w-full' >
            <form onSubmit={handleSubmit(submit)} className='flex flex-col' >
                <input
                    className='p-2 mt-2 mb-1 w-full border-2 rounded-sm border-zinc-500'
                    placeholder='Ej: Dany Santos'
                    id={'inputName'}
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register('name', { required: true })} />
                {errors.email && <span id={'errorInputEmail'} className='text-xs text-red-400 ' >This field is required</span>}
                <input
                    className='p-2 mt-2 mb-1 w-full border-2 rounded-sm border-zinc-500'
                    placeholder='email@example.com'
                    id={'inputEmail'}
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register('email', { required: true })} />
                {errors.email && <span id={'errorInputEmail'} className='text-xs text-red-400 ' >This field is required</span>}

                <input
                    className='p-2 mt-2 mb-1 w-full border-2 rounded-sm border-zinc-500'
                    placeholder='Password'
                    type='password'
                    id={'inputPassword'}
                    aria-invalid={errors.password ? "true" : "false"}

                    {...register('password', { required: true, minLength: 6 })} />
                {errors.password?.type === 'required' && <span id={'errorInputPassword'} className='text-xs text-red-400 ' >This field is required</span>}
                {errors.password?.type === 'minLength' && <span id={'errorInputPasswordMinLength'} className='text-xs text-red-400 ' >The min length of password is 6</span>}

                <button disabled={props.isLoading} className='p-2 bg-green-400 text-neutral-600 rounded-sm mx-0 mt-3' type='submit' >Create account</button>
                <div className="flex mt-4">
                    <p>You have account ? </p>
                    <Link className=' text-green-400 rounded-sm mx-2' type='submit' to={'/'}  >Login</Link>
                </div>
                {props.haveError && <div className='mt-2 p-2 bg-red-300 ' >
                    <p className=' text-black text-xs ' >{props.errorMessage}</p>
                </div>
                }
            </form>
        </div>
    )
}

export default SingUpForm;