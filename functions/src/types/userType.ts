export type userType = {
    storeId:string 
    username:string
    preapproval_id:string
    subscriptionData: subscriptionDataGeneral | subscriptionDataMP
    trialPeriodEnded:boolean
    failedPayments:number
    allStats:Array<String>
    firstMonthEnded: boolean
    productsId:string
    categoriesId:string
    accessToken: string
    scriptId:string
    state: boolean
    createdOn:Date
    offers:Array<String>
    email:string
    uninstallDate:Date
    lastUpdate:Date
    visualizationsQuantity:number
    categoryHook:string
    orderHook:string
    data_fiscal:object
    debt:number
    main_language:string
    dataStore:object
}
export type subscriptionDataGeneral = {
    status:string
}
export type subscriptionDataMP = subscriptionDataGeneral & {
    id:string
    payerId:string
    link:string
    amount:number
    date_modified:string
    last_modified:string
}
