import express from 'express'

import bodyParser from 'body-parser'
import { loggingMiddleware } from './middleware/logging.middleware';
import { sessionMiddleware } from './middleware/session.middleware';
import { userRouter } from './routers/user-router';
import { reimbursementsRouter } from './routers/reimbursements-router';
import { corsFilter } from './middleware/cors-filter.middleware';




const app = express()



app.use(loggingMiddleware)

app.use(bodyParser.json())

app.use(sessionMiddleware)

//this is so the browser can actually send us requests
app.use(corsFilter)




app.get('/', (req, res)=>{
    res.json('Try making a request to /artists')
})


app.use('/users', userRouter)
app.use('/reimbursements', reimbursementsRouter)







app.listen(3000, ()=>{
    console.log('App has started');  
})