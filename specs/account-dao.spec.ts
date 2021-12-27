/*import { AccountDAO, accountDaoAzure } from "../daos/account-dao"
import { Associate, Account } from "../entities";


const accountDao: AccountDAO = accountDaoAzure;

let testId: string = null;

describe('Account DAO Specs', ()=>{


    it('should create a account', async ()=>{
        let account: Account = {accountType:'lakeside auto', id:'', associates:[]}
        account = await accountDao.createAccount(account)
        expect(account.id).not.toBe('')
        testId = account.id
    })

    it('should get an account', async ()=>{
        const account: Account = await accountDao.getAccountById(testId)
        expect(account.accountType).toBe('lakeside auto')
    })

    it('should upsert an account', async ()=>{
        const associate: Associate = {make:'Subaru', model:'crosstrek', price:15000, year:2018, condition: "Used"}
        let account: Account = {accountType:'lakeside auto v2', id:testId, associates:[associate]}
        await accountDao.updateAccount(account)
        account = await  accountDao.getAccountById(testId)
        expect(account.associate.length).toBe(1)
        expect(account.accountType).toBe('lakeside auto v2')
    })

    it('should delete a account', async ()=>{
        const response = await accountDao.deleteAccountById(testId);  
    })

})*/