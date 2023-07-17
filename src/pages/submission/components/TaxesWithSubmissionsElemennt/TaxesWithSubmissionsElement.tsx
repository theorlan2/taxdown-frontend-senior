import React, { FunctionComponent } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

//
import { Submissions } from '@/models/tax/submission.model';
import { Link } from 'react-router-dom';


type Props = {
    tax: string;
    submissions: Submissions[];
    onDelete: (id: string) => void;
}

const TaxesWithSubmissionsElement: FunctionComponent<Props> = (props) => {
    return (
        <li   >
            <h5 id={'tax-year'} className='text-medium' ><b>Tax: </b>{props.tax}</h5>
            {props.submissions.map((item, indexS) =>
                <div key={`submission-element-${indexS}`} className=' indent-4' >
                    <div className='flex items-center' >
                        <p className='indent-2' >{`Submission ${(indexS + 1)}`}</p>
                        <Link className='ml-2 flex justify-center items-center rounded bg-slate-100 p-2' to={`/submission/${item.idTax}/form/${item.id}`} >
                            <PencilIcon className='h-4 w-4' />
                        </Link>
                        <button className='ml-2 flex justify-center items-center rounded bg-red-100 p-2' role='delete-button'  onClick={() => props.onDelete(item.id)} >
                            <TrashIcon className='h-4 w-4' />
                        </button>
                    </div>
                    <p className='text-sm' ><b>Name: </b>{item.name}</p>
                    <p className='text-sm' ><b>Surname: </b>{item.surname}</p>
                    <p className='text-sm' ><b>Age: </b>{item.age}</p>
                </div>
            )}
        </li>)

}
export default TaxesWithSubmissionsElement;