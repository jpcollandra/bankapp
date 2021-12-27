import { AccountDAO, accountDaoAzure } from "../daos/account-dao"
import { Associate, Account } from "../entities";


const accountDao: AccountDAO = accountDaoAzure;

let testId: string = null;

describe('Account DAO Specs', ()=>{


    it('should create a account', async ()=>{
        let account: Account = {accountType:'checkings', id:'', associate:[]}
        account = await accountDao.createAccount(account)
        expect(account.id).not.toBe('')
        testId = account.id
    })

    it('should get an account', async ()=>{
        const account: Account = await accountDao.getAccountById(testId)
        expect(account.accountType).toBe('checkings')
    })

    it('should upsert an account', async ()=>{
        const associate: Associate = {fname:'John', lname:'Doe', balance:15000}
        let account: Account = {accountType:'savings', id:testId, associate:[associate]}
        await accountDao.updateAccount(account)
        account = await  accountDao.getAccountById(testId)
        expect(account.associate.length).toBe(1)
        expect(account.accountType).toBe('savings')
    })

    it('should delete a account', async ()=>{
        const response = await accountDao.deleteAccountById(testId);  
    })

})