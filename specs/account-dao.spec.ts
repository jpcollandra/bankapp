/*
import { ClientDAO, clientDaoAzure } from "../daos/account-dao"
import { Client, Account } from "../entities";


const clientDao: ClientDAO = clientDaoAzure;

let testId: string = null;

describe('Account DAO Specs', ()=>{


    it('should create a account', async ()=>{
        let client: Client = {accountType:'checkings', id:'', client:[]}
        account = await accountDao.createAccount(account)
        expect(account.id).not.toBe('')
        testId = account.id
    })

    it('should get an account', async ()=>{
        const account: Account = await accountDao.getAccountById(testId)
        expect(account.accountType).toBe('checkings')
    })

    it('should upsert an account', async ()=>{
        const client: Client = {fname:'John', lname:'Doe', balance:15000}
        let account: Account = {accountType:'savings', id:testId, client:[client]}
        await accountDao.updateAccount(account)
        account = await  accountDao.getAccountById(testId)
        expect(account.client.length).toBe(1)
        expect(account.accountType).toBe('savings')
    })

    it('should delete a account', async ()=>{
        const response = await accountDao.deleteAccountById(testId);  
    })

}) */