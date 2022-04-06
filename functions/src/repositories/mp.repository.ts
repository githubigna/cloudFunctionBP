import { MercadoPago } from "mercadopago/interface"
import { impRepository } from "../interfaces/mp.interface"
import * as mercadopago from "mercadopago";
type mpUpdateParams = {
    storeId: string,
    status: string
}
export class mpRepository implements impRepository {
    _id: string
    mp: MercadoPago
    constructor(_id: string, access_token: string) {
        this._id = _id
        this.mp = mercadopago;
        this.mp.configure({ access_token });
    }
    async get(): Promise<mpUpdateParams> {
        console.log("Getter mpRepo ID::", this._id);

        let preapprovalData = await this.mp.preapproval.findById(this._id)

        let updateParams = {
            "storeId": preapprovalData.body.external_reference,
            "status": preapprovalData.body.status
        }
        return updateParams /* debería devolver el external reference de la subscripción */
    }
    async getPayment(): Promise<string> {

        let paymentData = await this.mp.payment.findById(parseInt(this._id));
        
        console.log("::P:A:D::",paymentData.body.external_reference);

        return paymentData.body.external_reference
    }
}