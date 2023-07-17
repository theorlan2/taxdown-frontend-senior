import React, { FunctionComponent, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { Link } from 'react-router-dom';
//
import { RootState } from '@/store'
import { Tax } from '@/models/tax/tax.model';
import { selectIsErrorFetchTax, selectIsLoadingFetchTax, selectTaxes } from '@/store/feactures/tax/tax.slice';
import { taxSagasActions } from '@/services/sagas/tax/tax.actions';
import { StatusFetch } from '@/models/enums';
import TaxesDataTable from './components/TaxesDataTable';


interface StateProps {
    isLoading: boolean;
    taxStatusFetch: StatusFetch;
    haveErrorFetch: boolean;
    taxes: Tax[];
}

interface DispatchProps { }

interface OwnProps { }

type Props = StateProps & DispatchProps & OwnProps;

const DashboardPage: FunctionComponent<Props> = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: taxSagasActions.FETCH_TAXES }); 
    }, [])

    return (
        <div className='dashboard w-full flex' >
            <div className="container mx-auto self-center">
                <div className="flex justify-end">
                    <Link className='bg-green-400 text-white rounded my-2 p-2 ' to={`/submissions`} >List Submissions</Link>
                </div>
                <div className="cont-table my-2 rounded-md overflow-hidden border-slate-300 border-2  ">
                  <TaxesDataTable data={props.taxes} isLoading={props.isLoading}  />
                </div>
                {props.haveErrorFetch && <div className='p-2 bg-red-300 ' >
                    <p className='text-black text-xs' >An error has occurred obtaining the taxes from the server.</p>
                </div>
                }

            </div>
        </div>
    )
}



const mapStateToProps = (state: RootState) => {
    return {
        isLoading: selectIsLoadingFetchTax(state),
        taxes: selectTaxes(state),
        taxStatusFetch: state.tax.statusFetch,
        haveErrorFetch: selectIsErrorFetchTax(state)
    }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
