import express from 'express'

// import { reimbursements } from '../state';
import { authorization } from '../middleware/auth.middleware';
// import { Reimbursement } from '../models/reimbursement';
import { findReimbursementByStatusService, findReimbursementByUserService, submitReimbursementService, updateReimbursementService, getAllReimbursementsService } from '../service/reimbursements.service';



export const reimbursementsRouter = express.Router()

//Find all Reimbursements
reimbursementsRouter.get('/status',[authorization(['finance-manager', 'admin']), async (req, res)=>{
    res.json(await getAllReimbursementsService())
}])


//Find Reimbursements By Status/statusId
reimbursementsRouter.get('/status/:statusId', [authorization(['finance-manager', 'admin']), async (req, res)=>{

    //console.log(req.params)// statusId should be from the :statusId 
    let id = +req.params.statusId//id is string by default, adding the + turns to int
    // let reimbursement = reimbursements.find((u) =>{ 
    //     return u.status === id
    // })

    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        let reimbursement = await findReimbursementByStatusService(id)
        if(reimbursement){
            res.json(reimbursement)
         } else {
            res.sendStatus(400)
        }
    }

}])


//Find Reimbursements By User
reimbursementsRouter.get('/author/userId/:userId', [authorization(['finance-manager', 'employee']), async (req, res)=>{

    //console.log(req.params)// statusId should be from the :statusId 
    let id = +req.params.userId//id is string by default, adding the + turns to int
    // let reimbursement = reimbursements.find((u) =>{ 
    //     return u.author === id
    // })

    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        let reimbursement = await findReimbursementByUserService(id)
        if(reimbursement){
            res.json(reimbursement)
         } else {
            res.sendStatus(400)
        }
    }

}])


//Update Reimbursement
reimbursementsRouter.patch('/edit/:id', [authorization(['finance-manager']), async (req, res) =>{
    let reimbursement_id = +req.params.id

    const { author, amount, 
        dateSubmitted, dateResolved, description, resolver, status, reimbursement_type_num} = req.body
    // let reimbursement = reimbursements.find((u) =>{ 
    //     return u.reimbursementId === id
    // })


    
    if(isNaN(reimbursement_id)){
        res.sendStatus(400)
    }else{
        let reimbursement:any = await updateReimbursementService(reimbursement_id, author, amount, 
            dateSubmitted, dateResolved, description, resolver, status, reimbursement_type_num)
    if(reimbursement){
        let {body} = req
        for(let key in reimbursement ){//loop through all fields on user
            if(!body[key]){//if they didn't give us one
              
            }else{
                reimbursement[key] = body[key]//else set new field
            }
        }
        res.json(reimbursement)
    } else {
        res.sendStatus(400)
    }
}

}])



//Submit Reimbursement
// reimbursementsRouter.post('/', (req, res)=>{
//     res.status(201).send('Create Reimbursement')
//     res.json(reimbursements)
// })

//Submit Reimbursement(Create a new Reimbursement)
reimbursementsRouter.post('', async (req, res)=>{
    let {body} = req //destructuring
    let checks = {
        author: '',
        amount: '',
        datesubmitted: '' ,
        dateresolved: '' ,
        description: '' ,
        resolver: '',
        status: '',
        reimbursement_type_num: ''
    }
    // let newReimbursement = new Reimbursement(1, 2, 3, 4, 5, '6', 7, 8, 9)// make a new user
    //let newReimbursement:any = await submitReimbursementService(body)
    for(let key in checks ){//loop through all fields on user
        // if(!body[key]){//if they didn't give us one
        //     res.status(400).send('please include all user fields')//fail
        //     break;}
        key
    //     }else{
    //         body[key] = body[key]//else set new field
    //     }
    }
    if(!res.finished){
        let newReimbursement:any = await submitReimbursementService(body)
        // reimbursements.push(newReimbursement)//add user to state
        res.json(newReimbursement)//send back new user
    }
})

