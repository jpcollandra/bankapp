import { ClientDAO } from "../daos/account-dao";
import { Client, Account } from "../entities";

// The service is used for business logic (rules applicable to to the real world) no negative ages, default values, etc...
// Also useful for logging and other utilities
export interface ClientService{

    addAccountToClient(id: string, account: Account): Promise<Client>

    retrieveClientById(clientId: string): Promise<Client>

    retrieveAllClient(): Promise<Client[]>;

    addClient(client: Client): Promise<Client>

}


export class ClientServiceImpl implements ClientService{

    // Dependency Injection allows us to swap the implementation of a dependency/property
    constructor(private clientDAO: ClientDAO){}

    async addClient(client: Client): Promise<Client> {
        client.account = client.account ?? []
        client = await this.clientDAO.createClient(client)
        return client;
    }


    async retrieveAllClient(): Promise<Client[]> {
        return this.clientDAO.getAllClient() 
    }

    async retrieveClientById(clientId: string): Promise<Client> {
        return this.clientDAO.getClientById(clientId)
    }
    
    async addAccountToClient(id: string, account: Account): Promise<Client> {
        const client:Client = await this.clientDAO.getClientById(id)
        client.account.push(account)
        await this.clientDAO.updateClient(client)
        return client
    }

}