import { useEffect, useState } from "react";
import { Tax } from "@/models/tax/tax.model";
import { Submissions } from "@/models/tax/submission.model";

type TaxAndSubmissions = {
    tax: string, submissions: Submissions[]
}

export function useTaxAndSubmissions(taxes: Tax[], submissions: Submissions[]): TaxAndSubmissions[] {

    const [result, setResult] = useState([] as TaxAndSubmissions[])

    useEffect(() => {
        const formatedValues = taxes.map(tax => {
            let submissionsOfThisTax = submissions.filter(item => item.idTax === tax.id);
            return {
                tax: tax.year,
                submissions: submissionsOfThisTax
            }
        })
        setResult(formatedValues);  
    }, [taxes, submissions]);

    return result;

}