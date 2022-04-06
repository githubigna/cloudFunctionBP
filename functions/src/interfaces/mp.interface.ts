import { paymentResponseData } from "./afip.interface";

type mpUpdateParams = {
    storeId: string;
    status: string;
}
export interface impRepository {
    get(): Promise<mpUpdateParams>;
    getPayment(): Promise<paymentResponseData>;
}