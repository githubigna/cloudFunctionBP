import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    storeId:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true,
        default: "Store" 
    },
    preapproval_id:{
        type: String,
        require: false
    },
    subscriptionData:{
        type: Object,
        require:false
    },
    trialPeriodEnded:{
        type: Boolean,
        require: true
    },
    failedPayments: {
        type: Number,
        default: 0
    },
    allStats:{
        type: Array,
        require: false
    },
    firstMonthEnded:{
        type: Boolean,
        require: true,
        defualt: false
    },
    productsId:{
        type: String,
        require: false
    },
    categoriesId:{
        type: String,
        require: false
    },
    accessToken:{
        type: String,
        require: true
    },
    scriptId:{
        type: String,
        require: true
    },
    state:{
        type: Boolean,
        require: true,
        defualt: true
    },
    createdOn:{
        type: Date,
        require: true,
        default: Date.now()
    },
    offers:{
        type: [String],
        require: false
    },
    email:{
        type: String,
        require: true
    },
    uninstallDate: {
        type: Date,
        default: ""
    },
    lastUpdate:{
        type: Date,
        require: false
    },
    visualizationsQuantity: {
        type: Number,
        default: -1,
    },
    categoryHook: {
        type: String,
        require: true,
        defualt: ""
    },
    orderHook: {
        type: String,
        require: true,
        defualt: ""
    },
    data_fiscal:{
        type: Object,
        require: false
    },
    debt:{
        type: Number,
        require: false,
    },
    main_language: {
        type: String,
        require: true,
        default: "es"
    },
    dataStore: {
        type: Object,
        require: true,
    }

});
export const userSchema = mongoose.model("User", UserSchema);
