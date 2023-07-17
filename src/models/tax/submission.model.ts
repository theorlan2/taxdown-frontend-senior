
export interface SubmissionsFormFieldType {
    id: string;
    label: string;
    placeholder: string;
    type: string;
    maxLength: number;
}

export interface SubmissionsFormType {
    id?: number
    inputFields: SubmissionsFormFieldType[]
}


export interface Submissions {
    id: string;
    idTax: string;
    name: string;
    surname: string;
    age: number;
}