import React, { FunctionComponent, } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form/dist/types';

type Props = {
    id: string;
    value?: string;
    label: string;
    register: UseFormRegister<any>,
    required: boolean,
    placeholder: string;
    type: string;
    maxLength: number;
    errors: FieldErrors<FieldValues>
}

const CustomInputField: FunctionComponent<Props> = (props) => {

    return (
        <div className='flex flex-col px-2  w-1/2 ' >
            <p className='text-sm' >{props.label}</p>
            <input
                className='border-2 rounded p-2  '
                type={props.type}
                placeholder={props.placeholder}
                {...props.register(props.label, { maxLength: props.maxLength, required: props.required })}
            />
            {/* @ts-ignore */}
            {props.errors[props.label] && props.errors[props.label].type === "required" && <span role='alert' className='text-xs opacity-70 mb-2' >{`The input ${props.label} is required`}</span>}
            {/* @ts-ignore */}
            {props.errors[props.label] && props.errors[props.label].type === "maxLength" && <span role='alert' className='text-xs opacity-70 mb-2' >{`The Max length is: ${props.maxLength} in the input  ${props.label}`}</span>}

        </div>
    )
}

export default CustomInputField;