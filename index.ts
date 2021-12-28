import Express from "express";
import errorHandler, { ResourceNotFoundError } from "./error-handles";
import { Client, Account } from "./entities";
import { ClientService, ClientServiceImpl } from "./services/account-service";
import { ClientDAO, clientDaoAzure} from "./daos/account-dao";
import { idText } from "typescript";

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
app.post('/clients/:id/account', async (req,res)=>{

    try {
        const account: Client = req.body
        await clientService.addClientToAccount(req.params.id, account)
        res.sendStatus(404)   
    } catch (error) {
        errorHandler(error,req,res)
    }
})
*/


app.listen(3000, () => console.log('App started'))
