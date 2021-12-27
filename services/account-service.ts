import { AccountDAO } from "../daos/account-dao";
import { Associate, Account } from "../entities";

// The service is used for business logic (rules applicable to to the real world) no negative ages, default values, etc...
// Also useful for logging and other utilities
export interface AccountService{

    addAssociateToAccount(accountId: string, associate: Associate ):Promise<Account>

    retrieveAccountById(accountId: string): Promise<Account>

    retrieveAllAccounts(): Promise<Account[]>;

    addAccount(account: Account): Promise<Account>

}


export class AccountServiceImpl implements AccountService{

    // Dependency Injection allows us to swap the implementation of a dependency/property
    constructor(private accountDAO: AccountDAO){}

    async addAccount(account: Account): Promise<Account> {
        account.associate = account.associate ?? []
        account = await this.accountDAO.createAccount(account)
        return account;
    }


    async retrieveAllAccounts(): Promise<Account[]> {
        return this.accountDAO.getAllAccount() 
    }

    async retrieveAccountById(accountId: string): Promise<Account> {
        return this.accountDAO.getAccountById(accountId)
    }
    
    async addAssociateToAccount(accountId: string, associate: Associate): Promise<Account> {
        const account:Account = await this.accountDAO.getAccountById(accountId)
        account.associate.push(associate)
        await this.accountDAO.updateAccount(account)
        return account
    }

}