const express = require("express")
const router = express.Router()
const workDB = require("../../db/work")

//查询
router.post("/", async (req, res) => {
    console.log(req.body);
    let { workName, workSubject, teacherName } = req.body
    if (workName && workSubject && teacherName) {
        workDB.find({ workName, workSubject, teacherName })
            .then(data => {
                // console.log(data);
                res.send({
                    code: 200,
                    msg: "作业查询成功",
                    data
                })
            })
    } else if (!workName && !workSubject && !teacherName) {
        //在数据库中进行查询
        workDB.find({})
            .then(data => {
                // console.log(data);
                res.send({
                    code: 200,
                    msg: "作业查询成功",
                    data
                })
            })

    } else if (workName && workSubject && !teacherName) {
        //在数据库中进行查询
        workDB.find({ workName, workSubject })
            .then(data => {
                // console.log(data);
                res.send({
                    code: 200,
                    msg: "作业查询成功",
                    data
                })
            })

    } else if (workName && !workSubject && !teacherName) {
        //在数据库中进行查询
        workDB.find({ workName })
            .then(data => {
                // console.log(data);
                res.send({
                    code: 200,
                    msg: "作业查询成功",
                    data
                })
            })

    } else if (!workName && workSubject && !teacherName) {
        //在数据库中进行查询
        workDB.find({ workSubject })
            .then(data => {
                // console.log(data);
                res.send({
                    code: 200,
                    msg: "作业查询成功",
                    data
                })
            })

    } else if (!workName && !workSubject && teacherName) {
        //在数据库中进行查询
        workDB.find({ teacherName })
            .then(data => {
                // console.log(data);
                res.send({
                    code: 200,
                    msg: "作业查询成功",
                    data
                })
            })

    }

    //返回成功数据
    //向前端发送响应
    // res.send({
    //     code: 200,
    //     msg: "作业发布成功",
    //     data: doc
    // })
})

module.exports = router