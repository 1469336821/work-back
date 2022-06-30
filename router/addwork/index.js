const express = require("express")
const router = express.Router()
const workDB = require("../../db/work")

//注册提交
router.post("/", async (req, res) => {
    console.log(req.body);
    let { workName, workSubject, startDate, endDate, teacherName,fileurl } = req.body
   
    //存到数据库
    await workDB.create({ workName, workSubject, startDate, endDate, teacherName,fileurl })

    //返回成功数据
    //向前端发送响应
    res.send({
        code: 200,
        msg: "作业发布成功",
    })
})

module.exports = router