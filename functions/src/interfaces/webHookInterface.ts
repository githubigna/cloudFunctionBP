import { webhookTypeEnum } from "../types/hooksEnum";
export interface iwebHookRepository {
    delete(id: string | null, storeId:string, accessToken:string): Promise<void>
    add(webhookType: webhookTypeEnum, storeId:string, accessToken:string): Promise<string>
}