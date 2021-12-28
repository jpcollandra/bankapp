import { Client } from "../entities";
import { CosmosClient } from "@azure/cosmos";
import { v4 } from "uuid";
import { ResourceNotFoundError } from "../error-handles";

export interface ClientDAO{

    //Create
    createClient(client: Client): Promise<Client>

    //Read
    getClientById(id: string): Promise<Client>
    getAllClient(): Promise<Client[]>

    //Update
    updateClient(client: Client): Promise<Client>

    //Delete
    deleteClientById(id: string ): Promise<boolean>

}

class ClientDaoAzure implements ClientDAO{

    private client = new CosmosClient(process.env.CosmosDBAuth)
    private database = this.client.database('Bank')
    private container = this.database.container('clients')

    async createClient(client: Client): Promise<Client> {
        client.id = v4();
        const response = await this.container.items.create<Client>(client)
        const {fname, lname, id, account} = response.resource;
        return {fname, lname, id, account}
    }

   async getClientById(dId: string): Promise<Client> {
        const response = await this.container.item(dId, dId).read<Client>();// resource-key, partition-key (the same for most containers)
        if(!response.resource){
            throw new ResourceNotFoundError(`The resource with id ${dId} was not found`)
        }
        return {id:response.resource.id, fname: response.resource.fname, lname: response.resource.lname, account:response.resource.account}
    }

    async getAllClient(): Promise<Client[]> {
        const response = await this.container.items.readAll<Client>().fetchAll()
        return response.resources.map(i => ({fname: i.fname, lname: i.lname, id: i.id, account:i.account}))
    }
    
    async updateClient(client: Client): Promise<Client> {
       const response = await this.container.items.upsert<Client>(client)
       if(!response.resource){
            throw new ResourceNotFoundError(`The resource with id ${client.id} was not found`)
       }
       return client
    }

    async deleteClientById(id: string): Promise<boolean> {
       this.getAllClient(); 
       const response = await this.container.item(id,id).delete();
       if(!response.resource){
            throw new ResourceNotFoundError(`The resource with id ${id} was not found`)
        }
       return true
    }
  
}

export const clientDaoAzure = new ClientDaoAzure(); // export an implementation of a Account DAO