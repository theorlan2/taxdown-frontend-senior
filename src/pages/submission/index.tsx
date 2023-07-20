import React, { FunctionComponent, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

//
import { RootState } from '@/store';
import { Submissions } from '@/models/tax/submission.model';
import { Tax } from '@/models/tax/tax.model';
import { useTaxAndSubmissions } from './hooks/useTaxAndSubmissions';
import TaxesWithSubmissionsElement from './components/TaxesWithSubmissionsElemennt/TaxesWithSubmissionsElement';
import InformationDialog from '@/components/commons/Dialogs/InformationDialog';
import { deleteSubmission } from '@/store/feactures/tax/tax.slice';
import { TypeDialogs } from '@/models/enums/typeDialogs';
import { taxSagasActions } from '@/services/sagas/tax/tax.actions';

type Props = {
    taxes: Tax[];
    submissions: Submissions[];
    deleteSubmission: (id: string) => void;
}

const SubmissionPage: FunctionComponent<Props> = (props) => {

    const [showAlertDelete, setshowAlertDelete] = useState(false)
    const [tempId, setTempId] = useState('')
    const taxesWithSubmisions = useTaxAndSubmissions(props.taxes, props.submissions);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({ type: taxSagasActions.FETCH_SUBMISSIONS });
    }, [])

    function deleteSelectSubmission() {
        props.deleteSubmission(tempId);
        dispatch({ type: taxSagasActions.FETCH_DELETE_SUBMISSION, payload: tempId });
        setTempId('');
        setshowAlertDelete(false);
    }

    function openDialogDeleteAndSaveTempId(id: string) {
        setTempId(id);
        setshowAlertDelete(true);
    }

    return (
        <div className='submission flex justify-center items-center w-full h-full' >
            <div className="container mx-auto">
                <div className="cont-submissions">
                    <div className="flex  items-center">
                        <Link className='flex mr-3 p-2 rounded bg-slate-100 my-2' to="/dashboard" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            <span className='ml-2' >Back</span>
                        </Link>
                        <h4 className='font-medium text-xl' >List of Submissions</h4>
                    </div>
                    <div className=" flex w-full border-1 bg-slate-200 h-1 mb-3 "></div>


                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">Tax Year</th>
                                <th scope="col" className="px-6 py-4">Name</th>
                                <th scope="col" className="px-6 py-4">Sur Name</th>
                                <th scope="col" className="px-6 py-4">Age</th>
                                <th scope="col" className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taxesWithSubmisions && taxesWithSubmisions.map((taxes, index) =>
                                taxes.submissions.map((element, index) => <tr className="border-b dark:border-neutral-500" key={`submission-${index}`}>
                                    <td className="whitespace-nowrap px-6 py-4 font-medium"> {taxes.tax}</td>
                                    <td className="whitespace-nowrap px-6 py-4" > {element.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4" > {element.surname}</td>
                                    <td className="whitespace-nowrap px-6 py-4" > {element.age}</td>
                                    <td className="whitespace-nowrap px-6 py-4 flex " >
                                        <Link className='ml-2 flex justify-center items-center rounded bg-slate-100 p-2' to={`/submission/${taxes.tax}/form/${element.id}`} >
                                            <PencilIcon className='h-4 w-4' />
                                        </Link>
                                        <button className='ml-2 flex justify-center items-center rounded bg-red-100 p-2' role='delete-button' onClick={() => openDialogDeleteAndSaveTempId(element.id)} >
                                            <TrashIcon className='h-4 w-4' />
                                        </button>
                                    </td>

                                </tr>)
                            )}
                        </tbody>
                    </table>
 
                </div>
            </div>
            <InformationDialog isOpen={showAlertDelete} title={'Is sure you delete this Submission?'} description={'If you delete this submission, you will not be able to recover it'} type={TypeDialogs.alert} textOnCancelButton={'Cancel'} textOnAcceptButton={'Yes, delete'} onAccept={() => deleteSelectSubmission()} onCancel={() => setshowAlertDelete(false)} closeModal={() => { setshowAlertDelete(false); }} />
        </div>
    )
}




const mapStateToProps = (state: RootState) => {
    return {
        taxes: state.tax.taxes,
        submissions: state.tax.submissions
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        deleteSubmission: (idSubmission: string) => dispatch(deleteSubmission(idSubmission)),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionPage);
