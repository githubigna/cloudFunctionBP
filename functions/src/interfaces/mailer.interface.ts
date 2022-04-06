export interface imailerRepository {
    sendMail(to: string, subject: string, attachment: string):Promise<void>;
}