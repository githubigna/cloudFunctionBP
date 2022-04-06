import * as mongoose from "mongoose"
// const uri = "mongodb+srv://admin:aycaramba@cluster0.imeo3.mongodb.net/cluster0?retryWrites=true&w=majority"

export class mongo {
    async init(){
        try {
            await mongoose.connect("mongodb+srv://admin:aycaramba@cluster0.imeo3.mongodb.net/cluster0?retryWrites=true&w=majority");
            console.log("Database connected");
        } catch (e) {
            console.log("Error conectando a la base de datos",e);
        }
    }
}