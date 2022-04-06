import * as functions from "firebase-functions";
import { paymentHandler } from "./controllers/paymentWebhook";
import { subscriptionHandler } from "./controllers/subscriptionWebhooks";
import { mongo } from "./database/mongodb";
let db = new mongo();

export const webhooks = functions.https.onRequest(async (request, response) => {
    response.sendStatus(200);
    await db.init();
    const { action, data, type } = request.body;
    console.log('request',request.body);
    
    if (type == "subscription_authorized_payment") {
        await paymentHandler(action, data.id);
    } else if (type == "subscription_preapproval") {
        await subscriptionHandler(action, data.id);
    }
});
console.log(functions.config().afip.bill_type);
console.log(functions.config().afip.sale_point);