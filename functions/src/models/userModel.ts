import { updateParams , userUpdateParams} from "../interfaces/userUpdateParams";
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
    business_id: string;
    email: string;
    onboardingComplete : boolean;
    debt?: number; //! - - - - - - - - debería tener siempre pero por si hay algún usuario viejo que por alguna razón no tiene - - - - - - - - - - - - - - 

    _repository?: iwebHookRepository;

    constructor(_id: string, state: boolean, status: string, orderHook: string | null, categoryHook: string | null, visualizationsQuantity: number, storeId: string, accessToken: string, business_id: string, email: string, onboardingComplete : boolean, debt?: number,) {
        this._id = _id;
        this.state = state;
        this.status = status;
        this.orderHook = orderHook;
        this.categoryHook = categoryHook;
        this.visualizationsQuantity = visualizationsQuantity;
        this.storeId = storeId;
        this.accessToken = accessToken;
        this.business_id = business_id
        this.email = email;
        this.onboardingComplete = onboardingComplete;
        this.debt = debt;
    }
    toObject(): userUpdateParams { //*------------->Función que devuelve, en forma de objecto, los datos del usuario que pueden ser modificados dentro del programa
        try {
            return {
                state: this.state,
                status: this.status,
                orderHook: this.orderHook,
                categoryHook: this.categoryHook,
                visualizationsQuantity: this.visualizationsQuantity,
                storeId: this.storeId,
                accessToken: this.accessToken,
                business_id: this.business_id,
                onboardingComplete: this.onboardingComplete,
                debt: this.debt
            }
        } catch (error) {
            throw new Error("Error en tranformación del usuario de dominio en objeto JSON (user.toObject :: linea 30 :: src/models/userModel.ts ::)")
        }
    }
    async update(updateParams: updateParams): Promise<void> { //*-------------> Funcion de actualización en caso que el webhook sea de suscripción
        try {
            if (updateParams.status !== this.status) { //!------------------<<->>-<<!>>-< Checkea si hubo realmente un cambio en el estatus de la suscripción ---->
                if (updateParams.status === "cancelled") {
                    this.state = false;
                    this.status = updateParams.status || this.status;
                    await this._repository?.delete(this.orderHook, this.storeId, this.accessToken);
                    await this._repository?.delete(this.categoryHook, this.storeId, this.accessToken);
                    this.orderHook = "";
                    this.categoryHook = "";
                }
                else if (updateParams.status === "authorized") {
                    this.onboardingComplete = true;
                    this.state = true;
                    this.status = updateParams.status || this.status;
                    this.orderHook = await this._repository?.add(webhookTypeEnum.order, this.storeId, this.accessToken) || null;
                    this.categoryHook = await this._repository?.add(webhookTypeEnum.category, this.storeId, this.accessToken) || null;
                }
            }
        } catch (e) {
            throw new Error("Error en la actualización del usuario de dominio (user.update :: linea 47 :: src/models/userModel.ts ::)")
        }
    }
    async updatePayment(): Promise<void> {//*-------------> Función de actualización en caso que el webhook sea de pago
        try {
            this.debt = 0
        } catch (e) {
            throw new Error("Error en la actualización del usuario de dominio para payment (user.updatePayment :: linea 68 :: src/models/userModel.ts ::)")
        }
    }

    set id(value: string) { //*------------->Seteo del id del usuario
        try {
            this._id = value;
        } catch (error) {
            throw new Error("Error en el seteo del user_id en set id  (user.id :: linea 76 :: src/models/userModel.ts ::)")
        }
    }

    set repository(value: iwebHookRepository) {//*------------->Seteo del webhook repository al usuario
        try {
            this._repository = value;
        } catch (error) {
            throw new Error("Error seteando el webHookRepository al usario de dominio (user.repository :: linea 84 :: src/models/userModel.ts ::)")
        }
    }
}