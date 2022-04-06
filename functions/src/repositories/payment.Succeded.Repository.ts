import { iuserRepository } from "../interfaces/userInterface";
import { iAfipRepository } from "../interfaces/afip.interface";
import { impRepository } from "../interfaces/mp.interface";
import { imailerRepository } from "../interfaces/mailer.interface"
import { calculatePeriod } from "../helpers/billingPeriodCalculator"

export class paymentSucceded {
    repository: iuserRepository;
    mpRepository: impRepository;
    afipRepository: iAfipRepository;
    mailerRepository: imailerRepository;
    constructor(repository: iuserRepository, mpRepository: impRepository, afipRepository: iAfipRepository, mailerRepository: imailerRepository) {
        this.repository = repository;
        this.mpRepository = mpRepository;
        this.afipRepository = afipRepository;
        this.mailerRepository = mailerRepository;
    }

    async executeUpdate() {//!------------->------------->------------->------------->testeado
        let mpData = await this.mpRepository.getPayment();//!------------->------------->testeado
        
        if (mpData.status != "approved" || mpData.impTotal == 2) return; //*------------>------------>------------>------------>Ejecuta solamente si el pago fue un pago aceptado

        let user = await this.repository.read(mpData.id);//!------------->------------->testeado
        //!calculos ------------->------------->------------->------------->------------->testeado
        let impNeto = (100 * mpData.impTotal) / 121;//*------------->------------->------------->calculo impNeto
        let impIVA = mpData.impTotal - impNeto;//*------------->------------->------------->calculo impIVA
        //!información del post ------------->------------->------------->------------->testeado
        const impNetoValue = parseFloat(impNeto.toFixed(2));
        const impIvaValue = parseFloat(impIVA.toFixed(2));
        const impImpTotalValue = parseFloat(mpData.impTotal.toFixed(2));
        let fechas =  calculatePeriod()
        let fechaInicio = fechas.fechaInicio;
        let fechaFin= fechas.fechaFin;
        let fechaVencimiento = fechas.fechaVencimiento;
        let data = {
            "data": {
                "items": [{
                    "codigo": "01",
                    "name": mpData.description,
                    "quantity": "1",
                    "unitPrice": mpData.impTotal.toFixed(2),
                    "bonificacion": "0",
                    "totalPrice": mpData.impTotal.toFixed(2)
                }],
                "Bonificacion": 0,
                "PtoVta": 3,
                "DocTipo": 80,
                "Condicion": "Consumidor final",
                "CbteTipo": 6,
                "DocNro": parseInt(user.business_id),
                "ImpTotal": impImpTotalValue,
                "ImpNeto": impNetoValue,
                "ImpIVA": impIvaValue,
                "FchServDesde": fechaInicio, 
                "FchServHasta": fechaFin,
                "FchVtoPago": fechaVencimiento, 
                "MonId": "PES",
                "MonCotiz": 1,
                "Iva": [{
                    "Id": 5,
                    "BaseImp": impNetoValue,
                    "Importe": impIvaValue
                }]
            },
            "app": "Flowy"
        };

        //*------------->------------->------------->------------->crear factura en AFIP
        let cbte = await this.afipRepository.createBill(data);//!------------->testeado------------->
        //*------------->------------->------------->------------->Conseguir factura en Base64 
        console.log(cbte);

        let factura = await this.afipRepository.getBill(cbte);//!------------->testeado------------->
        //*------------->------------->------------->------------->Enviar mail con factura en PDF
        await this.mailerRepository.sendMail(user.email, `Factura Flowy`, factura);//!------------->testeado
        //*------------->------------->------------->------------->Pasar la deuda a 0
        await user.updatePayment();//!------------->------------->testeado------------->
        //*------------->------------->------------->------------->Actualizar el usuario en la BBDD
        await this.repository.update(user); //!------------->------------->testeado ------------->
    };
};