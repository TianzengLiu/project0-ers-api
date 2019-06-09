import { getAllUsers, findUserById, findUserByUsernameAndPassword, updateUser } from "../dao/user.dao";
import { Request } from "express";


//this will have all the business logic for getallusers
export async function getAllUsersService(){
    //send email to big boss someone asked for all users
    //write to specific log file about it
    return await getAllUsers()
}

export async function findUserByIdService(userId:number){
    return await findUserById(userId)
}

export async function updateUserService(user_id:number, username: string, password: string, 
    firstName: string, lastName: string, email: string,  role: string[]){
    return await updateUser(user_id, username, password, 
        firstName, lastName, email, role)
}

export async function findUserByUsernameAndPasswordService(req:Request, username:string, password:string){
    let user = await findUserByUsernameAndPassword(username, password)
    if(typeof(user) === 'string'){//if its an error pass it up the line
        return user
    } else { //else add it to our session
        req.session.user = user
        return user
    }
}