export interface iAfipRepository {
    app : string;
    api_secret : string;
    createBill(data:object):Promise<number>;
    getBill(cbte:number):Promise<string>;
}
export interface paymentResponseData {
    id:string;
    impTotal:number;
    description:string;
    status:string;
}