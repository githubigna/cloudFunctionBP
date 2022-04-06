import { subscriptionUpdate } from "../repositories/subUpdatedRepository";
import { userRepository } from "../repositories/userRepository";
import { webhookrepository } from "../repositories/webHookRepository";
import { mpRepository } from "../repositories/mp.repository";
import * as functions from 'firebase-functions'


export async function subscriptionHandler(action: string, id: string) {//*-------------> Controlador de webhook de susccripción
    let mpRepo = new mpRepository(id,functions.config().mp.token) //*-------------> Crea el repository de mercado pago 
    let webhook = new webhookrepository();//*-------------> Crea el repository de webhooks
    let usuarioR = new userRepository();//*-------------> Crea el repository de usuario de interfaz
    let subUpdate = await new subscriptionUpdate(usuarioR, webhook, mpRepo); //*-------------> Crea el servicio de suscripción actualizada
    await subUpdate.executeUpdate()//*-------------> Ejecuta la actualización del servicio de suscripción actualizada
}