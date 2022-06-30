const express = require("express")
const router = express.Router()
const workDB = require("../../db/work")

//注册提交
router.delete("/", async (req, res) => {
    // 打印前端传过来的值
    console.log(req.body);

    let { _id } = req.body
    // 数据库查找那组数据
    //删  deleteOne  deleteMany
    workDB.deleteOne({ _id })
        .then(data => {
            //返回成功数据
            //向前端发送响应
            res.send({
                code: 200,
                msg: "删除成功",
            })
        })


})

module.exports = router