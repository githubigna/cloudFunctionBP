import * as mongoose from "mongoose"
// const uri = "mongodb+srv://admin:aycaramba@cluster0.imeo3.mongodb.net/cluster0?retryWrites=true&w=majority"
// TODO|0|poner los accesos de la bbdd de producción, url de afip de producción y checkear todos los datos de la factura para ver que no tenga ningun parametro 
// TODO|1|hardcodeado
export class mongo {
    async init(){
        try {
            await mongoose.connect("mongodb+srv://Admin:FlowyMongoDB@cluster0.hobgl.mongodb.net/cluster0?retryWrites=true&w=majority");
            console.log("Database connected!!!:::");
        } catch (e) {
            throw new Error("Error conectando con la base de datos :: src/database/mongodb.ts ::")
        }
    }
}