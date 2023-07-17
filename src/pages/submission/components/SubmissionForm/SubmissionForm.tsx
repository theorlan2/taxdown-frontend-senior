import React, { FunctionComponent, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
//
import { Submissions, SubmissionsFormType } from '@/models/tax/submission.model';
import CustomInputField from '../CustomInputField/CustomInputField';


type Props = {
    idTax?: string;
    submissionForm: SubmissionsFormType;
    submission: Submissions;
    onSubmit: (data: Submissions) => void
}

const SubmissionForm: FunctionComponent<Props> = (props) => {
    const uuid = uuidv4();
    const { register, formState: { errors }, reset, getValues, handleSubmit } = useForm<Submissions>()

    useEffect(() => {
        if (props.submission) {
            reset(props.submission);
        }
    }, [props.submission, reset])


    function onSubmitForm(data: Submissions) {
        if (props.idTax) {
            const dataResult = { ...data, idTax: props.idTax, id: data.id ? data.id : uuid }
            props.onSubmit(dataResult);
        }
        props.onSubmit(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="title w-full">
                <h4 className='font-medium text-lg ml-2' >Submission for tax:</h4>
            </div>
            <div className="flex justify-start w-full flex-wrap">
                {props.submissionForm && props.submissionForm.inputFields && props.submissionForm.inputFields.map(((item, index) =>
                    item.label && <CustomInputField {...item} errors={errors} register={register} required label={item.label.toLocaleLowerCase()}  key={`input-${index}`} value={getValues(item.label.toLocaleLowerCase() as keyof Submissions) as string} />
                ))}
            </div>
            <div className="w-full flex justify-end">
                <Link className='flex mx-3 my-3 px-4 py-2 rounded  ' to="/dashboard" >Back</Link>
                <button type='submit' className='flex mx-3 my-3 px-4 py-2 rounded bg-green-400 text-white ' >Send</button>
            </div>
        </form>
    )
}

export default SubmissionForm