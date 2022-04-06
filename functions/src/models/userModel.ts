import { updateParams } from "../interfaces/userUpdateParams";
import { iwebHookRepository } from "../interfaces/webHookInterface";
import { webhookTypeEnum } from "../types/hooksEnum";
export class user {
    _id: string;
    state: boolean;
    status: string;
    orderHook: string | null;
    categoryHook: string | null;
    visualizationsQuantity: number;
    storeId: string;
    accessToken: string;
    debt?:number;

    _repository?: iwebHookRepository;

    constructor(_id: string, state: boolean, status: string, orderHook: string | null, categoryHook: string | null, visualizationsQuantity: number, storeId:string, accessToken:string,debt?:number ) {
        this._id = _id;
        this.state = state;
        this.status = status;
        this.orderHook = orderHook;
        this.categoryHook = categoryHook;
        this.visualizationsQuantity = visualizationsQuantity;
        this.storeId = storeId;
        this.accessToken = accessToken;
        this.debt = debt;
    }
    toObject(): object {
        return {
            state: this.state,
            status: this.status,
            orderHook: this.orderHook,
            categoryHook: this.categoryHook,
            visualizationsQuantity: this.visualizationsQuantity,
            storeId: this.storeId,
            accessToken: this.accessToken
        }
    }
    async update(updateParams: updateParams): Promise<void> {
        try {
            if (updateParams.status === "cancelled") {
                this.state = false;
                this.status = updateParams.status || this.status;
                await this._repository?.delete(this.orderHook, this.storeId, this.accessToken);
                await this._repository?.delete(this.categoryHook, this.storeId, this.accessToken);
                this.orderHook = "";
                this.categoryHook = "";
            }
            else if (updateParams.status === "authorized") {
                this.state = true;
                this.status = updateParams.status || this.status;
                this.orderHook = await this._repository?.add(webhookTypeEnum.order, this.storeId, this.accessToken) || null;
                this.categoryHook = await this._repository?.add(webhookTypeEnum.category, this.storeId, this.accessToken) || null;
            }

        } catch (e) {
            console.log("Error en updateParams", e);
        }
    }
    async updatePayment(): Promise<void> {
        try {
        this.debt = 0
        } catch (e) {
            console.log("Error en updatepayment", e);
        }
    }

    set id(value: string) {
        this._id = value;
    }

    set repository(value: iwebHookRepository) {
        console.log("set Webhook repository");
        this._repository = value;
    }
}