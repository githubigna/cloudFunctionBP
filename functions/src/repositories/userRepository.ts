import { iuserRepository } from "../interfaces/userInterface"
import { user } from "../models/userModel"
import { userSchema } from "../database/models/userSchema"
export class userRepository implements iuserRepository {
    async read(_id: string): Promise<user> {
        let query = await userSchema.findById(_id).then((res)=>{console.log(res).catch((e)=>{console.log(e);
        });
        });
        console.log(query);
        
        let userInstance = new user(_id, query.state, query.subscriptionData.status, query.orderHook, query.categoryHook, query.visualizationsQuantity, query.storeId, query.accessToken);
        return userInstance
    }

    async update(user: user): Promise<void> {
        await userSchema.findByIdAndUpdate(user._id, user.toObject());
    }
}   