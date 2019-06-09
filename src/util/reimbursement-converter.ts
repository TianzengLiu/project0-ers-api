import { Reimbursement } from "../models/reimbursement";
import { ReimbursementDTO } from "../dtos/reimbursement.dto";

export function sqlReimbursementTojsReimbursement(sqlreimbursement:ReimbursementDTO):Reimbursement{
    return new Reimbursement(sqlreimbursement.reimbursement_id, sqlreimbursement.author, 
        sqlreimbursement.amount, sqlreimbursement.datesubmitted,
        sqlreimbursement.dateresolved, sqlreimbursement.description, 
        sqlreimbursement.resolver, sqlreimbursement.status, 
        sqlreimbursement.reimbursement_type_num)
}