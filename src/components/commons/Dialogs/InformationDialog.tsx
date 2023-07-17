import React, { Fragment, FunctionComponent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { TypeDialogs } from '@/models/enums/typeDialogs';

type Props = {
    isOpen: boolean;
    title: string;
    description: string;
    type: TypeDialogs;
    textOnCancelButton: string;
    textOnAcceptButton: string;
    closeModal: () => void;
    onCancel?: () => void;
    onAccept?: () => void;
}

const InformationDialog: FunctionComponent<Props> = (props) => {

    function onCancel() {
        if (props.onCancel)
            props.onCancel()
    }

    function onAccept() {
        if (props.onAccept)
            props.onAccept()
    }

    return (
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {props.title}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">{props.description}</p>
                                </div>

                                {props.type === TypeDialogs.alert && <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent mr-2 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                        onClick={onCancel}
                                    > {props.textOnCancelButton}
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                        onClick={onAccept}
                                    >
                                        {props.textOnAcceptButton}
                                    </button>
                                </div>}

                                {props.type === TypeDialogs.information && <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onAccept}
                                    >{props.textOnAcceptButton}</button>
                                </div>}

                                {props.type === TypeDialogs.loading && <div className="mt-2 w-full flex justify-center ">
                                    <ArrowPathIcon className={`h-5 w-10 animate-spin`} />
                                </div>}


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>)
}

export default InformationDialog