import express from 'express'
// import { users } from '../state';
import { authorization } from '../middleware/auth.middleware';
import { getAllUsersService, findUserByIdService, findUserByUsernameAndPasswordService, updateUserService } from '../service/users.service';



export const userRouter = express.Router()

//Find all users
userRouter.get('',[authorization(['finance-manager', 'admin']), async (req, res)=>{
    res.json(await getAllUsersService())
}])


//Find Users By Id
userRouter.get('/:id', [authorization(['finance-manager','employee']), async (req, res)=>{
    let id = +req.params.id//id is string by default, adding the + turns to int
    // let user = users.find((u) =>{ 
    //     return u.userId === id
    // })

    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        let user = await findUserByIdService(id)
        if(user){
            res.json(user)
         } else {
            res.sendStatus(400)
        }
    }


    // if(user){
    //     res.json(user)
    // } else {
    //     res.sendStatus(400)
    // }
}])


//lets make a login endpoint
userRouter.post('/login', async (req, res)=>{
    const {username, password} = req.body
    // const user = users.find(u => u.username === username && u.password === password)
    let user = await findUserByUsernameAndPasswordService(req, username, password)

    if(typeof(user) === 'string'){
        res.sendStatus(401)
    } else{
        res.send(JSON.stringify(user))// don't send them the session
        //we send them their user object
    }


    // if(user){
    //     req.session.user = user
    //     res.send(req.session)// don't send them the session
    //     //we send them their user object
    // } else{
    //     res.status(400).send('Invalid Credentials')
    // }
})




//updating a user
userRouter.patch('/edit/:id', [authorization(['admin']), async (req, res) =>{
    let user_id = +req.params.id
    const { username, password, 
            firstName, lastName, email, role} = req.body
    // let user = users.find((u) =>{ 
    //     return u.userId === id
    // })

    
    if(isNaN(user_id)){
        res.sendStatus(400)
    }else{
        let user:any = await updateUserService(user_id, username, password, 
            firstName, lastName, email, role)
    if(user){
        let {body} = req
        for(let key in user ){//loop through all fields on user
            if(!body[key]){//if they didn't give us one
              
            }else{
                user[key] = body[key]//else set new field
            }
        }
        res.json(user)
    } else {
        res.sendStatus(400)
    }
}
}])