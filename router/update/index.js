const express = require("express")
const router = express.Router()
const workDB = require("../../db/work")

//注册提交
router.post("/", async (req, res) => {
    // 打印前端传过来的值
    console.log(req.body);

    let { workName, workSubject, startDate, endDate, teacherName, _id } = req.body
    // 数据库查找那组数据
    workDB.findByIdAndUpdate(_id, {
        workName,
        workSubject,
        startDate,
        endDate,
        teacherName
    }).then(data => {
        //返回成功数据
        //向前端发送响应
        res.send({
            code: 200,
            msg: "作业修改成功",
            data
        })
    })


})

module.exports = router