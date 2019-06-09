import { PoolClient } from "pg";
import { connectionPool } from ".";
import { sqlReimbursementTojsReimbursement } from "../util/reimbursement-converter";
// import { Request } from "express-serve-static-core";




// find all Reimbursements
export async function getAllReimbursements(){
    let client:PoolClient
    //this connection might take some time to be made
    //we do it asynchronously

    //we will get a Promise
    try{
        client = await connectionPool.connect()//await says, wait for the promise to resolve
        //all code beneath the await will become a callback after the await is done
        let result = await client.query('SELECT * FROM "ers-api".reimbursements')
        return result.rows.map(sqlReimbursementTojsReimbursement)
    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }
}



//Find Reimbursements By Status/statusId
export async function findReimbursementByStatus(statusId:number){
    let client:PoolClient

    try{
        client = await connectionPool.connect()//await cause this is async
        //this is how to write a paramaterized query
        //we use $1, $2 ... to represent params
        //we put all those params in an array and use it as the second argument
        let result = await client.query(`SELECT * FROM "ers-api".reimbursements 
                                        WHERE reimbursements.status = $1`, [statusId])
        return sqlReimbursementTojsReimbursement(result.rows[0])
    } catch(err){//check for what kind of error and send back appropriate custom error
        console.log(err)
        return '500'
    } finally {
        client && client.release()
    }
}


//Find Reimbursements By User/userId
export async function findReimbursementByUser(userId:number){
    let client:PoolClient

    try{
        client = await connectionPool.connect()//await cause this is async
        //this is how to write a paramaterized query
        //we use $1, $2 ... to represent params
        //we put all those params in an array and use it as the second argument
        let result = await client.query(`SELECT * FROM "ers-api".reimbursements 
                                        WHERE reimbursements.author = $1`, [userId])
        return sqlReimbursementTojsReimbursement(result.rows[0])
    } catch(err){//check for what kind of error and send back appropriate custom error
        console.log(err)
        return '500'
    } finally {
        client && client.release()
    }
}



//Submit Reimbursement
export async function submitReimbursement(body){
    let client:PoolClient

    try{
        client = await connectionPool.connect()//await cause this is async
        //this is how to write a paramaterized query
        //we use $1, $2 ... to represent params
        //we put all those params in an array and use it as the second argument
        let result = await client.query(`INSERT INTO "ers-api".reimbursements 
        (author, amount, dateSubmitted, dateResolved, description, resolver, status, reimbursement_type_num) 
        values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`, 
        [body.author, body.amount, body.dateSubmitted, body.dateResolved, body.description, 
        body.resolver, body.status, body.reimbursement_type_num])
        return sqlReimbursementTojsReimbursement(result.rows[0])
    } catch(err){//check for what kind of error and send back appropriate custom error
        console.log(err)
        return '500'
    } finally {
        client && client.release()
    }
}



//Update Reimbursement
export async function updateReimbursement(reimbursement_id:number, author: number, amount: number, 
    dateSubmitted: number, dateResolved: number, description: string, resolver: number,
    status: number, reimbursement_type_num: number){
    let client:PoolClient

    try{
        client = await connectionPool.connect()//await cause this is async
        //this is how to write a paramaterized query
        //we use $1, $2 ... to represent params
        //we put all those params in an array and use it as the second argument
        let result = await client.query(`UPDATE "ers-api".reimbursements SET author = $1, amount = $2,
        datesubmitted = $3, dateresolved = $4, description = $5, resolver = $6, status = $7, reimbursement_type_num = $8
        WHERE reimbursement_id = $9 returning author, amount, datesubmitted, dateresolved, description,
        resolver, status, reimbursement_type_num, reimbursement_id`,
        [author, amount, dateSubmitted, dateResolved, description, resolver, status, reimbursement_type_num, reimbursement_id])
        return sqlReimbursementTojsReimbursement(result.rows[0])
    } catch(err){//check for what kind of error and send back appropriate custom error
        console.log(err)
        return '500'
    } finally {
        client && client.release()
    }
}
