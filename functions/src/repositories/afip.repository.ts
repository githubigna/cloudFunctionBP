import {Axios} from "axios"
const axios = new Axios()

export class afipRepository {
    app: string
    api_secret: string
    constructor(app: string, api_secret: string) {
        this.app = app,
            this.api_secret = api_secret
    }
    private async auth(): Promise<string> {
        const response = await axios.post("https://afip.apeirongs.com/api/v1/auth/token",
            {
                "userName": this.app
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "apipublic": this.api_secret
                }
            })
        return response.data.Token
    }
    async createBill(data: object):Promise<number> {
        let token = await this.auth();
        const bill = await axios.post("https://afip.apeirongs.com/api/v1",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
        return bill.data.cbte
    }
    async getBill(cbte: number):Promise<string> {
        let token = await this.auth();
        const bill = await axios.get(`https://afip.apeirongs.com/api/v1/base64/${cbte}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
        return bill.data.factura
    }
}