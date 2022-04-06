import { iuserRepository } from "../interfaces/userInterface"
import { user } from "../models/userModel"
import { userSchema } from "../database/models/userSchema"
import { userUpdateParams } from "../interfaces/userUpdateParams";
export class userRepository implements iuserRepository {
    async read(_id: string): Promise<user> { //*------------->Función que brinda el usuario de dominio
        try {
            let query = await userSchema.findById(_id);
            let userInstance = new user(_id, query.state, query.subscriptionData.status, query.orderHook, query.categoryHook, query.visualizationsQuantity, query.storeId, query.accessToken, query.dataStore.business_id,query.email,query.onboardingComplete,query.debt);
            return userInstance
        } catch (error) {
            throw new Error("Error la obtención del usuario de dominio mediante el userRepository (userRepository.read :: linea 5 :: src/repositories/userRepository.ts ::)")
        };
    };


    async update(user: user): Promise<void> { //*------------->Función que persiste en la BBDD cualquier cambio ejercido sobre el usuario de dominio que es pasado como parámetro
        try {
            const userObject : userUpdateParams = user.toObject();

            await userSchema.findByIdAndUpdate(user._id,{
                $set:{
                    "subscriptionData.status":`${userObject.status}`,
                    "state":`${userObject.state}`,
                    "orderHook":`${userObject.orderHook}`,
                    "categoryHook":`${userObject.categoryHook}`,
                    "visualizationsQuantity":`${userObject.visualizationsQuantity}`,
                    "storeId":`${userObject.storeId}`,
                    "accessToken":`${userObject.accessToken}`,
                    "business_id":`${userObject.business_id}`,
                    "onboardingComplete":userObject.onboardingComplete,
                    "debt": userObject.debt
                }
            });
        } catch (error) {
            console.log("Error::",error);
            
            throw new Error("Error en update usuario en userRepository (userRepository.update :: linea 15 :: src/repositories/userRepository.ts ::)")
        };
    };
};   