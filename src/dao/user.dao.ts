import { connectionPool } from '.';
import { sqlUsertojsUSer } from '../util/user-converter';
import { PoolClient } from 'pg';
// import { bcrypt } from 'bcrypt'


// const saltRounds = 10; // for bcrypt

//we are allowing getAllUsers to be added to our c++ apis
export async function getAllUsers(){
    let client:PoolClient
    //this connection might take some time to be made
    //we do it asynchronously

    //we will get a Promise
    try{
        client = await connectionPool.connect()//await says, wait for the promise to resolve
        //all code beneath the await will become a callback after the await is done
        let result = await client.query('SELECT * FROM "ers-api".users1')
        return result.rows.map(sqlUsertojsUSer)
    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }
}

//Find Users By Id
export async function findUserById(userId:number){
    let client:PoolClient

    try{
        client = await connectionPool.connect()//await cause this is async
        //this is how to write a paramaterized query
        //we use $1, $2 ... to represent params
        //we put all those params in an array and use it as the second argument
        let result = await client.query(`SELECT * FROM "ers-api".users1 WHERE user_id = $1`, [userId])
        return sqlUsertojsUSer(result.rows[0])
    } catch(err){//check for what kind of error and send back appropriate custom error
        console.log(err)
        return '500'
    } finally {
        client && client.release()
    }
}


//login
export async function findUserByUsernameAndPassword(username:string, password:string){
    let client:PoolClient

    try{
        client = await connectionPool.connect()


        // bcrypt.hash(password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.
          



            let query = 'SELECT * FROM "ers-api".users1 WHERE username = $1 and password_u = $2'
            let result = await client.query(query, [username, password])
            if(!result.rows[0]){
                return 'User not found'
            }
            return sqlUsertojsUSer(result.rows[0])
        // });
    }catch(err){
        console.log(err);
        return 'Internal'
    } finally{
        client && client.release()
    }
}



//Update User
export async function updateUser(user_id:number, username: string, password: string, 
    firstName: string, lastName: string, email: string,  role: string[]){
    let client:PoolClient

    try{
        client = await connectionPool.connect()//await cause this is async
        //this is how to write a paramaterized query
        //we use $1, $2 ... to represent params
        //we put all those params in an array and use it as the second argument
        let result = await client.query(`UPDATE "ers-api".users1 SET username = $1, password_u = $2,
        first_name = $3, last_name = $4, email = $5, roles = $6 WHERE user_id = $7  
        returning username, password_u, first_name, last_name, email, roles, user_id`,
        [username, password, firstName, lastName, email, role, user_id])
        return sqlUsertojsUSer(result.rows[0])
    } catch(err){//check for what kind of error and send back appropriate custom error
        console.log(err)
        return '500'
    } finally {
        client && client.release()
    }
}