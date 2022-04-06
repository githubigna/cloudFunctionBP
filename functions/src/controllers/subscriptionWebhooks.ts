import { subscriptionUpdate } from "../repositories/subUpdatedRepository";
import { userRepository } from "../repositories/userRepository";
import { webhookrepository } from "../repositories/webHookRepository";
import { mpRepository } from "../repositories/mp.repository";
import * as functions from 'firebase-functions'


export async function subscriptionHandler(action: string, id: string) {
    console.log("MERCADOPAGO::",functions.config().mp.token);
    let mpRepo = new mpRepository(id,functions.config().mp.token)
    let webhook = new webhookrepository();
    let usuarioR = new userRepository();
    let subUpdate = await new subscriptionUpdate(usuarioR, webhook, mpRepo);
    await subUpdate.executeUpdate()
}