import axios from "axios"
import { imailerRepository } from "../interfaces/mailer.interface"

export class mailerRepository implements imailerRepository {
    private async auth(): Promise<string> { //*-------------> Función que autentica frente a la API del microservicio de mailing
        try {
            const result = await axios.post("https://api.apeirongs.com/mailer/v1/auth/token",
            {
                "userName": "Flowy"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    apipublic: "9fuj901dsn239hfg24jg2804gj9134f9'3gj8935jg89104u3hf9k'1d8305yuhdh732y1d893en1803j81fg3",
                }
            });
            return result.data.Token;
        } catch (error) {
            throw new Error("Error en la autenticación (mailerRepository.auth :: linea 5 :: src/repositories/mailing.ts ::)")
        }
    }
    async sendMail(to: string, subject: string, attachment: string): Promise<void> { //*-------------> Función que envía el E-Mail 
        const token = await this.auth();
        try {
            const info = {
                url: "https://api.apeirongs.com/mailer/v1/send",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    to,
                    subject,
                    attachments: [{
                        "filename": `ComprobanteFacturaFlowy.pdf`,
                        "content": attachment,
                        "encoding": 'base64'
                    }],
                }
            };
            await axios.post(info.url, info.body, { headers: info.headers });
            console.log("MAIL TO |||||||||||||||||||||||",to);
        } catch (error) {
            const info = {
                url: "https://api.apeirongs.com/mailer/v1/send",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    to: "contabilidad.appeiron@gmail.com",
                    subject: `Error en envío de factura a ${to}`,
                    attachments: attachment,
                }
            };
            await axios.post(info.url, info.body, { headers: info.headers });
        }
    }
}