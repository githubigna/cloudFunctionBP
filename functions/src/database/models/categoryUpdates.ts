import * as mongoose from "mongoose"

const categoryUpdateSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    flag: {
        type: Boolean,
        default: false,
    },
    store_id: {
        type: String,
        require: true
    },
    hook_id: {
        type: String,
        require: true
    },
});

export const categoryUpdate = mongoose.model('CategoryUpdate', categoryUpdateSchema);