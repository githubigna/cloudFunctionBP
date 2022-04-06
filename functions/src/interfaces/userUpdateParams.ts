/*export type updateParams = {
    state?: boolean
    status? :string 
    orderHook?:string | null
    categoryHook?:string | null
    visualizationsQuantity?:number
}
*/
export type userUpdateParams = {
    state: boolean,
    status: string,
    orderHook: string | null,
    categoryHook: string | null,
    visualizationsQuantity: number,
    storeId: string,
    accessToken: string,
    business_id: string,
    onboardingComplete: boolean,
    debt?: number
}

export type updateParams = {
    status: string;
}