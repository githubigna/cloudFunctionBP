import { mpRepository } from "../repositories/mp.repository"
import { userRepository } from "../repositories/userRepository";
import { paymentSucceded} from "../repositories/payment.Succeded.Repository";
import * as functions from 'firebase-functions'
export async function paymentHandler(action:string,id:string){
    let mpRepo = new mpRepository(id,functions.config().mp.token);
    let usuarioR = new userRepository();
    let paymentSuccededR = new paymentSucceded(usuarioR, mpRepo)
    paymentSuccededR.executeUpdate()
}