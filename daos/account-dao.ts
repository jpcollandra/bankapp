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
    deleteClientById(id: string ): Promise<Client>

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
        const response = await this.container.item(dId, dId).read<Client>();
        if(!response.resource){
            throw new ResourceNotFoundError(`The resource with id ${dId} was not found`)
        }
        return {fname: response.resource.fname, lname: response.resource.lname, id:response.resource.id,account:response.resource.account}
    }

    async getAllClient(): Promise<Client[]> {
        const response = await this.container.items.readAll<Client>().fetchAll()
        return response.resources.map(i => ({fname: i.fname, lname: i.lname, id: i.id, account:i.account}))
    }
    
    async updateClient(client: Client): Promise<Client> {
       await this.getClientById(client.id)
       const response = await this.container.items.upsert<Client>(client);
       return response.resource;
    }

    async deleteClientById(id: string): Promise<Client> {
       const client = await this.getClientById(id);
       const response = await this.container.item(id,id).delete();
       return client;
    }
  
}

export const clientDaoAzure = new ClientDaoAzure(); // export an implementation of a Account DAO