import { user } from "../models/userModel";

export interface iuserRepository {
    read(id: string): Promise<user>;
    update(user: user): Promise<void>;
}