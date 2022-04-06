import { iwebHookRepository } from "../interfaces/webHookInterface";
import { webhookTypeEnum } from "../types/hooksEnum";
import { Axios } from "axios"
const axios = new Axios()

export class webhookrepository implements iwebHookRepository {
    async delete(id: string | null, storeId: string, accessToken: string): Promise<void> {
        console.log("Delete webhook::", id);
        try {
            const response = await fetch(`https://api.tiendanube.com/v1/${storeId}/webhooks/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authentication: `bearer ${accessToken}`,
                    "User-Agent": "Flowy - Cross-sell & Up-sell (appflowy@gmail.com)",
                },
            });
            console.log("Response delete WebHook::", response);

        } catch (error) {
            console.log("Error delete WebHook webHookRepository::", error);
        }
    }
    async add(webhookType: webhookTypeEnum, storeId: string, accessToken: string): Promise<string> {
        console.log("Add webhook::", webhookType);
        let urlEnd: string;
        if (webhookType === "order/paid") {
            urlEnd = "order";
        } else {
            urlEnd = "category_updated";

        }
        try {

            const response = axios.post(`https://api.tiendanube.com/v1/${storeId}/webhooks`,
                {
                    url: `https://flowy.com.ar/api/webhooks/${urlEnd}`,
                    event: webhookType,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authentication: `bearer ${accessToken}`,
                        "User-Agent": "Flowy - Cross-sell & Up-sell (appflowy@gmail.com)",
                    }
                })

            console.log("Response add WebHook::", response);

        } catch (error) {
            console.log("Error add WebHook webHookRepository::", error);
        }
        /**
         * AGREGAR EN TIENDANUBE UN WEBHOOK todo
         */
        return "id"
    }
}