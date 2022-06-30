const express = require("express")
const router = express.Router()
const userDB = require("../../db/user")

//注册提交
router.post("/", async (req, res) => {
    console.log(req.body);
    let { identity, user, pass } = req.body
    //验证数据
    if (!(identity == "学生" || identity == "教师" || identity == "root")) {
        res.send({
            code: 500,
            msg: "数据格式错误,注册失败"
        })
        return
    }
    if ((!/^[\w\u4e00-\u9fa5\u0800-\u4e00\uac00-\ud7ff]{2,10}$/.test(user)) || (!/^[\w\[\]\/\\~`|<>,.?;':"{}!@#$%^&*()_+=-]+$/.test(pass))) {
        res.send({
            code: 500,
            msg: "数据格式错误,注册失败"
        })
        return
    }
    //验证用户是否存在
    let doc = await userDB.findOne({ user })
    if (doc) {
        return res.send({
            code: 300,
            msg: "用户名已存在"
        })
    }
    //存到数据库
    await userDB.create({ identity, user, pass })

    //返回成功数据
    //向前端发送响应
    res.send({
        code: 200,
        msg: "注册成功",
    })
})
//用户查询
router.post("/search", (req, res) => {
    let { identity, user } = req.body

    if (identity && user) {
        userDB.findOne({ identity, user })
            .then(data => {
                res.send({
                    code: 200,
                    msg: "查询成功",
                    data
                })
            })
    } else if (identity && !user) {
        userDB.find({ identity })
            .then(data => {
                res.send({
                    code: 200,
                    msg: "查询成功",
                    data
                })
            })
    } else if (!identity && user) {
        userDB.find({ user })
            .then(data => {
                res.send({
                    code: 200,
                    msg: "查询成功",
                    data
                })
            })
    }
    else {
        userDB.find({})
            .then(data => {
                res.send({
                    code: 200,
                    msg: "查询成功",
                    data
                })
            })
    }

})
//用户信息修改
router.post("/update",(req,res)=>{
    let {identity,user,pass,_id} = req.body

    userDB.findByIdAndUpdate({_id},{
        identity,user,pass
    }).then(data=>{
        res.send({
            code:200,
            msg:"修改成功",
            data
        })
    })
})
//用户信息删除
router.delete("/delete",(req,res)=>{
    let {_id} = req.body
    userDB.deleteOne({_id})
    .then(data=>{
        res.send({
            code:200,
            msg:"删除成功",
            data
        })
    })
})

module.exports = router