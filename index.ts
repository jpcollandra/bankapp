import Express from "express";
import errorHandler, { ResourceNotFoundError } from "./error-handles";
import { Client, Account } from "./entities";
import { ClientService, ClientServiceImpl } from "./services/account-service";
import { ClientDAO, clientDaoAzure} from "./daos/account-dao";

const app = Express(); 

app.use(Express.json())

const clientService: ClientService = new ClientServiceImpl(clientDaoAzure)

app.get('/clients', async (req, res) => {

    try {
        const client: Client[] = await clientService.retrieveAllClient();
        res.status(200)
        res.send(client)
    } catch (error) {
        errorHandler(error,req,res)
    }
    
})

app.post('/clients', async (req, res)=>{

    try {
        let client: Client = req.body
        client = await clientService.addClient(client)
        res.status(201)
        res.send(client)      
    } catch (error) {
        errorHandler(error,req,res)
    }

})

app.get('/clients/:id', async (req, res)=>{
    try {
        const client: Client = await clientService.retrieveClientById(req.params.id)
        res.send(client)
    } catch (error) {
        if({instanceof : ResourceNotFoundError}){
            res.status(404)
            res.send("No Such Client Exists")
        }
            else{
                res.status(500)
            }
        }
})


app.put('/clients/:id', async (req, res)=>{
    try {
        const client: Client = req.body
        client.id = req.params.id
        await clientDaoAzure.updateClient(client)
        res.send(client)
    } catch (error) {
        if({instanceof : ResourceNotFoundError}){
        res.status(404)
        res.send("No Such Client Exists")
    }
        else{
            res.status(500)
        }
    }
})


app.delete('/clients/:id', async (req, res)=>{
    try {
        await clientDaoAzure.deleteClientById(req.params.id)
        res.send("Deleted Successfully")
        res.status(205)
    } catch (error) {
        if({instanceof : ResourceNotFoundError}){
            res.status(404)
            res.send("No Such Client Exists")
        }
            else{
                res.status(500)
            }
        }
    })

/*
app.post('/clients/:id/accounts/:accountType', async (req, res)=>{
    try {
        const {id, accountType} = req.params;
        const client: Client = await clientDaoAzure.getClientById(id)      
        const newAccount : Account = await clientService.addAccountToClient( client.id, account.accountType)
        res.status(201)
        res.send(client)
    } catch (error) {
        if({instanceof : ResourceNotFoundError}){
            res.status(404)
            res.send("No Such Client Exists")
        }
            else{
                res.status(500)
            }
        }
})



    app.get('/clients/:id/accounts', async (req, res) =>{
        try {
            const{id} = req.params;

            res.send(account)
            res.status(200)

        } catch (error) {
            if({instanceof : ResourceNotFoundError}){
                res.status(404)
                res.send("No Account Exists")
            }
                else{
                    res.status(500)
                }
            }
        })


    app.patch('/clients/:id/accounts/:accountType/deposit', async (req, res) =>{
        try {
        const {id, accountType} = req.params;
        const {amount} = req.body;
        console.log(id)
        const client: Client = await clientDaoAzure.getClientById(id)      
        const account: Account = await clientService.getAccountFromClient(client.account, accountType)
        if(amount < 0){
            console.log("Cannot Be Negative")
        }else{
        account.balance += Number(amount);
        clientDaoAzure.updateClient(client);
        res.send("associate patch successfully");
    }
    }catch (error) {
        if({instanceof : ResourceNotFoundError}){
            res.status(404)
            res.send("No Account Exists")
        }
            else{
                res.status(500)
            }
        }
    })

    app.patch('/clients/:id/accounts/:accountType/withdraw', async (req,res) =>{
        try {
        const {id, accountType} = req.params;
        const {amount} = req.body;
        console.log(id)
        const client: Client = await clientDaoAzure.getClientById(id)      
        const account: Account = await clientService.getAccountFromClient(client.account, accountType)
        account.balance -= Number(amount);
        if(account.balance < 0){
        console.log("Negative Balance")
         }else{
        clientDaoAzure.updateClient(client);
        res.send("associate patch successfully");
    }
    }catch (error) {
        if({instanceof : ResourceNotFoundError}){
            res.status(404)
            res.send("No Account Exists")
        }
            else{
                res.status(500)
            }
        }
    })

*/
app.listen(3000, () => console.log('App started'))
