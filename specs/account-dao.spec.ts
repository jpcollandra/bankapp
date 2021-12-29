
import { ClientDAO, clientDaoAzure } from "../daos/account-dao"
import { Client, Account } from "../entities";


const clientDao: ClientDAO = clientDaoAzure;

let testId: string = null;

describe('Client DAO Specs', ()=>{


    it('should create a account', async ()=>{
        let client: Client = {fname:"John", lname:"Doe", id:'', account:[]}
        client = await clientDaoAzure.createClient(client)
        expect(client.id).not.toBeDefined
        testId = client.id
    })

    it('should client by id', async ()=>{
        const client: Client = await clientDao.getClientById(testId)
        expect(client.id).toBeDefined
    })

    it('get all clients', async ()=>{
        const clients: Client[] = await clientDaoAzure.getAllClient();
        expect(clients).toBeDefined
    })

    /*
    it('should update account', async ()=>{
        const updatedClient: Client = {fname:"John", lname:"Doe", id: "", account:[{accountType:"vacationfund", balance:3200}]}
        await clientDao.updateClient(updatedClient);
        const retrivedClient: Client = await clientDao.getClientById(updatedClient.id);
        expect(retrivedClient.fname).toBe("John")
    })
    })
    */

    it('should delete a account', async ()=>{
        const response = await clientDao.deleteClientById(testId); 
        expect(testId).toBeNull
    })
 
})