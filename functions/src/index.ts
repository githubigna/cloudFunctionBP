import * as functions from "firebase-functions";
import { paymentHandler } from "./controllers/paymentWebhook";
import { subscriptionHandler } from "./controllers/subscriptionWebhooks";
import { mongo } from "./database/mongodb"
let db = new mongo()
// functions.logger.info("Hello logs!", { structuredData: true });
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const webhooks = functions.https.onRequest(async (request, response) => {
    await db.init()
    const { action, data, type } = request.body;
    console.log("Action: ", action)
    console.log("Data: ", data)
    console.log("Type: ", type)

    response.sendStatus(200);
    if (type === "payment") {
        await paymentHandler(action, data.id)
    } else if (type === "subscription_preapproval") {
        await subscriptionHandler(action, data.id)
    }
});
