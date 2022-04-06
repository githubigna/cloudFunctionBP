import { iAfipRepository } from "../interfaces/afip.interface";
import * as functions from 'firebase-functions'
import axios from "axios";
export class afipRepository implements iAfipRepository {
    app: string;
    api_secret: string;
    constructor(app: string, api_secret: string) {
        this.app = app,
            this.api_secret = api_secret
    };
    private async auth(): Promise<string> {//*------------->Método privado de autenticación frente a la API del microservicio de AFIP 
        try {
            let res = await axios.post(`https://${functions.config().afip.url}${functions.config().afip.api_version}/auth/token`,
                {
                    "userName": this.app
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        'apipublic': `${this.api_secret}`,
                    }
                }
            )

            return res.data.Token
        } catch (error) {
            throw new Error("Error en la autenticación  (afipRepository.auth :: linea 13 :: src/repositories/afip.repository.ts ::)")
        }
        
    }
    async createBill(data: any, retry = true): Promise<number> { //*------------->Función que crea, mediante "data", una nueva factura (COMPROBANTE ELECTRONICO) 
        try {
            let token: string = await this.auth();
            let res = await axios.post(`https://${functions.config().afip.url}${functions.config().afip.api_version}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            return res.data.cbte 
        } catch (error) {
            if (retry) {
                return await this.createBill(data, retry = false);
            } else {
                console.log("AFIP::::::::::",error);
                
                throw new Error("Error en la creación de factura (afipRepository.createBill :: linea 26 :: src/repositories/afip.repository.ts ::)")
            }
        };
    };
    
    async getBill(cbte: number): Promise<string> { //*------------->Función que pide la factura que corresponda con el número de comprobante enviado
        try {
            let token: string = await this.auth();
            const bill = await axios.get(`https://${functions.config().afip.url}${functions.config().afip.api_version}/base64/${cbte}?${functions.config().afip.sale_point}&${functions.config().afip.bill_type}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                console.log(bill);
            return bill.data.Factura
        } catch (error) {
            console.log("error",error);
            throw new Error("Error consiguiendo la factura en base 64 (afipRepository.getBill :: linea 42 :: src/repositories/afip.repository.ts ::)")
        };
    };
};