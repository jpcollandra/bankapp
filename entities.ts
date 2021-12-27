export interface Associate{

    fname: string
    lname: string
    balance: number


}

export interface Account{

    id: string
    accountType: string
    associate: Associate[]    

}