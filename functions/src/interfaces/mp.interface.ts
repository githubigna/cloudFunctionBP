import { MercadoPago } from "mercadopago/interface";

type mpUpdateParams = {
    storeId: string,
    status: string
}
export interface impRepository {
    _id: string;
    mp:MercadoPago;
    get(): Promise<mpUpdateParams>;
    getPayment(): Promise<string>;
}