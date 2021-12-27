import { Account } from "../entities";
import { CosmosClient } from "@azure/cosmos";
import { v4 } from "uuid";
import { ResourceNotFoundError } from "../error-handles";

export interface AccountDAO{

    //Create
    createAccount(account: Account): Promise<Account>

    //Read
    getAccountById(id: string): Promise<Account>
    getAllAccount(): Promise<Account[]>

    //Update
    updateAccount(account: Account): Promise<Account>

    //Delete
    deleteAccountById(id: string ): Promise<boolean>

}

//process.env.DB ??
class AccountDaoAzure implements AccountDAO{

    private client = new CosmosClient(process.env.CosmosDBAuth)
    private database = this.client.database('Bank')
    private container = this.database.container('clients')

    async createAccount(account: Account): Promise<Account> {
        account.id = v4();
        const response = await this.container.items.create<Account>(account)
        const {id, accountType, associate} = response.resource;
        return {id, accountType, associate}
    }

    async getAccountById(dId: string): Promise<Account> {
        const response = await this.container.item(dId, dId).read<Account>();// resource-key, partition-key (the same for most containers)
        if(!response.resource){
            throw new ResourceNotFoundError(`The resource with id ${dId} was not found`)
        }
        return {id:response.resource.id, accountType: response.resource.accountType, associate:response.resource.associate}
    }

    async getAllAccount(): Promise<Account[]> {
        const response = await this.container.items.readAll<Account>().fetchAll()
        return response.resources.map(i => ({associate: i.associate, id:i.id, accountType:i.accountType}))
    }
    
    async updateAccount(account: Account): Promise<Account> {
       const response = await this.container.items.upsert<Account>(account)
       if(!response.resource){
            throw new ResourceNotFoundError(`The resource with id ${account.id} was not found`)
       }
       const {id, accountType, associate} = response.resource
       return {id, accountType, associate}
    }

    async deleteAccountById(id: string): Promise<boolean> {
       const response = await this.container.item(id,id).delete();
       if(!response.resource){
            throw new ResourceNotFoundError(`The resource with id ${id} was not found`)
        }
       return true
    }
    
}

export const accountDaoAzure = new AccountDaoAzure(); // export an implementation of a Account DAO