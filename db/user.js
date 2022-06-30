const mongoose = require("mongoose")
// 表规则
let Schema = mongoose.Schema
let userSchema = new Schema({
    //身份
    identity: {
        type: String,
        required: true
    },
    //用户名
    user: {
        type: String,
        required: true
    },

    //密码
    pass: {
        type: String,
        required: true
    },

    //头像
    photo: {
        type: String,
        default: "/file/photo/1.jpg"
    }

})
// 建表
module.exports = mongoose.model("user", userSchema)