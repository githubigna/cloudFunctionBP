import { MercadoPago } from "mercadopago/interface"
import { impRepository } from "../interfaces/mp.interface"
import { paymentResponseData } from "../interfaces/afip.interface";
import axios, { AxiosResponse } from "axios"
import * as mercadopago from "mercadopago";

type mpUpdateParams = {
    storeId: string,
    status: string
}
export class mpRepository implements impRepository {
    private _id: string
    private mp: MercadoPago
    private _accessToken : string
    constructor(_id: string, access_token: string) {
        this._id = _id
        this.mp = mercadopago;
        this._accessToken = access_token;
        this.mp.configure({ access_token });
    }
    async get(): Promise<mpUpdateParams> {//*------------->Función que pide la suscripción con los datos del webhook
        try {
            let preapprovalData = await this.mp.preapproval.findById(this._id)

            let updateParams = {
                "storeId": preapprovalData.body.external_reference,
                "status": preapprovalData.body.status
            }
            return updateParams
        } catch (error) {
            throw new Error("Error en getSubscription (mpRepository.get :: linea 17 :: src/repositories/mp.repository.ts ::)")
        }
    }
    async getPayment(): Promise<paymentResponseData> {//*------------->Función que pide el pago con los datos del webhook
        try {
            let response: AxiosResponse = await axios.get(`https://api.mercadopago.com/authorized_payments/${this._id}`, {
                headers: {

                    Authorization: `Bearer ${this._accessToken}`
                }
            })
            let data: paymentResponseData = {
                "status": response.data.payment.status,
                "id": response.data.external_reference,
                "impTotal": response.data.transaction_amount,
                "description": response.data.reason
            }
            return data
        } catch (error) {
            throw new Error("Error en getPayment (mpRepository.getPayment :: linea 30 :: src/repositories/mp.repository.ts ::)")
        }
    }
}