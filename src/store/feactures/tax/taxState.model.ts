import { GenericFeature } from "@/models/shared";
import { SubmissionsFormType,  Submissions } from "@/models/tax/submission.model";
import { Tax } from "@/models/tax/tax.model";

export interface TaxState extends GenericFeature {
    taxes: Tax[];
    submissionsForm: SubmissionsFormType;
    submissions: Submissions[];
}
