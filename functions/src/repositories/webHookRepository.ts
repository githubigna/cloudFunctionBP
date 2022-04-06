import { iwebHookRepository } from "../interfaces/webHookInterface";
import { webhookTypeEnum } from "../types/hooksEnum";
import {categoryUpdate} from "../database/models/categoryUpdates"
import axios from "axios"
export class webhookrepository implements iwebHookRepository {
    async delete(id: string | null, storeId: string, accessToken: string): Promise<void> {
        if(id === null) return;
        try {
            await axios.delete(`https://api.tiendanube.com/v1/${storeId}/webhooks/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authentication: `bearer ${accessToken}`,
                        "User-Agent": "Flowy - Cross-sell & Up-sell (appflowy@gmail.com)",
                    },
                })
        } catch (error) {
            throw new Error("Error en delete webhook (webHookRepository.delete :: linea 7 :: src/repositories/webHookRepository.ts ::)")
        }
    }
    async add(webhookType: webhookTypeEnum, storeId: string, accessToken: string): Promise<string> {
        try {
            let urlEnd: string;
            if (webhookType === "order/paid") {
                urlEnd = "order";
            } else {
                urlEnd = "category_updated";
            }
            let res = await axios.post(`https://api.tiendanube.com/v1/${storeId}/webhooks`,
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
            if(webhookType === "category/updated"){
                await categoryUpdate.findOneAndUpdate({"store_id":storeId},{
                    $set:{
                        "hook_id":res.data.id
                    }
                })
            }
            return res.data.id
        } catch (error) {
            throw new Error("Error en add webhook (webHookRepository.add :: linea 21 :: src/repositories/webHookRepository.ts ::)")
        }
    }
}