export interface Client{

    fname: string
    lname: string
    id: string  
    //multiple
    account: Account[] 

}

export interface Account{
    accountType: string
    balance: number
}