import React, { FunctionComponent } from 'react'
import DataTable, { defaultThemes } from 'react-data-table-component';
//
import { Tax } from '@/models/tax/tax.model';
import { Link } from 'react-router-dom';

type Props = {
    data: Tax[];
    isLoading: boolean
}

const TaxesDataTable: FunctionComponent<Props> = (props) => {
    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#cbd5e2',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: defaultThemes.default.divider.default,
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },
    };


    const columns = [
        {
            name: 'ID',
            selector: (row: Tax) => row.id,
        },
        {
            name: 'Name',
            selector: (row: Tax) => row.name,
        },
        {
            name: 'Year',
            selector: (row: Tax) => row.year,
        },
        {
            name: 'Actions',
            cell: (row: Tax) => <Link className='p-1 bg-green-500 text-white rounded m-2 px-2 ' to={`/submission/${row.id}/form`} >Add Submissions</Link>,
        },
    ];

    return (
        <>
            <DataTable
                title='Tax List'
                columns={columns}
                data={props.data}
                progressPending={props.isLoading}
                customStyles={customStyles}
                dense
            />
        </>
    )
}

export default TaxesDataTable