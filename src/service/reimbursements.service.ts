import { findReimbursementByStatus, findReimbursementByUser, submitReimbursement, updateReimbursement, getAllReimbursements } from "../dao/reimbursement.dao";
// import { Request } from "express-serve-static-core";


//Find all Reimbursements
export async function getAllReimbursementsService(){
    return await getAllReimbursements()
}


//Find Reimbursements By Status/statusId
export async function findReimbursementByStatusService(statusId:number){
    return await findReimbursementByStatus(statusId)
}


//Find Reimbursements By User/userId
export async function findReimbursementByUserService(userId:number){
    return await findReimbursementByUser(userId)
}

//Submit Reimbursement
export async function submitReimbursementService(body:any){
    return await submitReimbursement(body)
}


//Update Reimbursement
export async function updateReimbursementService(reimbursement_id:number, author: number, amount: number, 
    dateSubmitted: number, dateResolved: number, description: string, resolver: number, status: number, type: number){
    return await updateReimbursement(reimbursement_id, author, amount, dateSubmitted, dateResolved, 
                                     description, resolver, status, type)
}