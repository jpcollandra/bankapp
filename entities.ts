export interface Client{

    fname: string
    lname: string
    id: string  
    account: Account[] 

}

export interface Account{

    accountType: string
    balance: number
}