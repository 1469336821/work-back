const mongoose = require("mongoose")
// 表规则
let Schema = mongoose.Schema
let workSchema = new Schema({
    //作业名称
    workName: {
        type: String,
        required: true
    },
    //所属科目
    workSubject: {
        type: String,
        required: true
    },
    //发布时间
    startDate: {
        type: String,
        required: true
    },
    //截止时间
    endDate: {
        type: String,
        required: true
    },
    //老师姓名
    teacherName: {
        type: String,
        required: true
    },
    //文件地址
    fileurl: {
        type: String,
        default: ""
    },

})
// 建表
module.exports = mongoose.model("work", workSchema)