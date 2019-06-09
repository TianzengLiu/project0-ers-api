import { User } from "./models/user";

import { Role } from "./models/role";
import { Reimbursement } from "./models/reimbursement";
import { ReimbursementStatus } from "./models/reimbursementStatus";
import { ReimbursementType } from "./models/reimbursementType";


import {bcrypt} from 'bcrypt'

const saltRounds = 10;

let password_tony = '123'
bcrypt.hash(password_tony, saltRounds, function(err, hash) {
    if(!err) {
        //if no error
        console.log(hash)
    } else {
        console.log('Error: ', err)
    }
  });







export let users:User[] = [
    {
    userId: 1,
	username: 'Tony',
	password: '123',
	firstName: 'Tony',
	lastName: 'Liu',
	email: 'tony@gmail.com',
    role: ['employee','admin'] 
    }, 
    {
        userId: 2,
        username: 'Tony2',
        password: '1234',
        firstName: 'Tony2',
        lastName: 'Liu2',
        email: 'tony2@gmail.com',
        role: ['employee'] 
        },
        {
            userId: 3,
            username: 'Manager',
            password: '12345',
            firstName: 'Manager',
            lastName: 'Liu',
            email: 'manager@gmail.com',
            role: ['employee','finance-manager'] 
            }

]

export let roles:Role[] = [{
    roleId: 1,
    role: ['finance-manager']
},{
    roleId: 2 ,
    role: ['employee'] 
},{
    roleId: 3 ,
    role: ['admin'] 
}
]

export let reimbursements: Reimbursement[] = [{
    reimbursementId: 0, 
	author: 1, 
	amount: 100,  
    dateSubmitted: 1, 
    dateResolved: 1, 
    description: '1', 
    resolver: 1,
    status: 1, 
    type: 1
},
{
    reimbursementId: 1, 
	author: 2, 
	amount: 200,  
    dateSubmitted: 2, 
    dateResolved: 2, 
    description: '2', 
    resolver: 2,
    status: 2, 
    type: 2
},
{
    reimbursementId: 2, 
	author: 3, 
	amount: 300,  
    dateSubmitted: 3, 
    dateResolved: 3, 
    description: '3', 
    resolver: 3,
    status: 3, 
    type: 3
}
]


export let reimbursementStatuss:ReimbursementStatus[] = [{
    statusId: 1,
    status: 'Pending'
},{
    statusId: 2,
    status: 'Approved'
},{
    statusId: 3,
    status: 'Denied'
}
]


export let reimbursementTypes:ReimbursementType[] = [{
    typeId: 1,
    type: 'Lodging'
},{
    typeId: 2,
    type: 'Travel'
},{
    typeId: 3,
    type: 'Food'
},{
    typeId: 4,
    type: 'Other'
}
]