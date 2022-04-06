import { iuserRepository } from "../interfaces/userInterface";
import { iwebHookRepository } from "../interfaces/webHookInterface";
import { impRepository } from "../interfaces/mp.interface";

export class subscriptionUpdate {
    repository: iuserRepository;
    webhookRepository: iwebHookRepository;
    mpRepository: impRepository;

    constructor(repository: iuserRepository, webhookRepository: iwebHookRepository, mpRepository: impRepository) {
        this.repository = repository;
        this.webhookRepository = webhookRepository;
        this.mpRepository = mpRepository;
    }

    async executeUpdate() {//*------------->------------->------------->------------->Función que ejecuta el servicio de subscription updated
        //*------------->------------->------------->------------->-------------> Crea el repository de mercadopago
        let mpData = await this.mpRepository.get();//!------------->-------------> testeado
        //*------------->------------->------------->------------->-------------> Obtiene el repository de usuario de dominio a partir del usuario de interfaz
        let user = await this.repository.read(mpData.storeId)//!-------------> testeado
        //*------------->------------->------------->------------->-------------> Asigna por un set el webhook repository al user
        user.repository = this.webhookRepository;//!------------->-------------> testeado
        //* Ward
        if(mpData.status == user.status) return;
        //!------------->------------->------------->------------->-------------> Actualiza el usuario poniendo/quitando webhooks y datos
        await user.update(mpData)//*------------->------------->-------------> testeado
        //!------------->------------->------------->------------->-------------> Ejecuta la actualización BBDD
        this.repository.update(user);//*------------->------------->-------------> testeado

    }
}