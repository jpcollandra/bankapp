export interface Associate{

    faccountType: string
    laccountType: string
    balance: number


}

export interface Account{

    id: string
    accountType: string
    associate: Associate[]    

}