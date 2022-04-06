import { mpRepository } from "../repositories/mp.repository"//*------------->Requiere el repository de mercadopago
import { userRepository } from "../repositories/userRepository";//*------------->Requiere el repository de usuario de interfaz
import { paymentSucceded } from "../repositories/payment.Succeded.Repository";//*------------->Requiere el repository del servicio de pago actualizado
import { afipRepository } from "../repositories/afip.repository";//*------------->Requiere el repository del microservicio de AFIP
import { mailerRepository } from "../repositories/mailing";//*--------------->Requiere el repository del microservicio de mailing
import * as functions from 'firebase-functions'//*------------->Importa las funciones y variables de firebase 
export async function paymentHandler(action: string, id: string) { //*------------->Controlador de Webhook de actualización de pago
    if(action != "updated") return;//*------------->Solo se manejan los pagos aceptados para facturar y para persistir los datos de pago en el usuario
    const mpRepo = new mpRepository(id, `${functions.config().mp.token}`);//*------------->Crea el repository de mercadopago
    const usuarioR = new userRepository();//*------------->Crea el repository de interfaz del usuario
    const afipR = new afipRepository(`${functions.config().afip.app}`,`${functions.config().afip.api_public}` );//*------------->Crea el repository del microservicio de AFIP 
    const mailing = new mailerRepository()//*------------->Crea el repository del microservicio de mailing
    const paymentSuccededR = new paymentSucceded(usuarioR, mpRepo, afipR, mailing)//*------------->Crea el repository del servicio de actualización de pago que requiere los repos anteriores
    paymentSuccededR.executeUpdate()//*------------->Ejecuta la actualización del servicio de actualización de pago <-----------
}
