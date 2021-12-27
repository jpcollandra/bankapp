import Express from "express";
import errorHandler from "./error-handles";
import { Associate, Account } from "./entities";
import { AccountService, AccountServiceImpl } from "./services/account-service";
import { accountDaoAzure } from "./daos/account-dao";

const app = Express(); 

app.use(Express.json())


const accountService: AccountService = new AccountServiceImpl(accountDaoAzure)

app.get('/clients', async (req, res) => {

    try {
        const associate: Account[] = await accountService.retrieveAllAccounts();
        res.send(associate)
    } catch (error) {
        errorHandler(error,req,res)
    }
    
})

app.get('/clients/:id', async (req, res)=>{

    try {
        const associate: Account = await accountService.retrieveAccountById(req.params.id)
        res.send(associate)
    } catch (error) {
        errorHandler(error,req,res)
    }

})

app.post('/clients', async (req, res)=>{

    try {
        let associate: Account = req.body
        associate = await accountService.addAccount(associate)
        res.sendStatus(201)
        res.send(associate)      
    } catch (error) {
        errorHandler(error,req,res)
    }


})

app.post('/clients/:id/account', async (req,res)=>{

    try {
        const account: Associate = req.body
        await accountService.addAssociateToAccount(req.params.id, account)
        res.sendStatus(201)   
    } catch (error) {
        errorHandler(error,req,res)
    }
})

app.listen(3000, () => console.log('App started'))
