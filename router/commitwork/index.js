const express = require("express")
const multer = require("multer")
const router = express.Router()
const path = require("path")
const workDB = require("../../db/work")
const commitDB = require("../../db/commit")
const { log } = require("console")

let upload = multer({
    storage: multer.diskStorage({
        //文件存储的目录
        destination(req, file, cb) {
            cb(null, path.join(__dirname, '../../public/file/photo'))
        },
        //文件的名字
        filename(req, file, cb) {
            let name = req.session.userInfo._id
            let { ext } = path.parse(file.originalname)
            req.filename = name + ext
            cb(null, name + ext)
        }
    })
}).single('file')
//文件地址
router.post("/", (req, res) => {
    upload(req, res, async (err) => {
        //上传失败
        if (err) {
            return res.send({
                code: 500,
                msg: "上传失败"
            })
        }
        //上传成功
        let photo = `/file/photo/${req.filename}`
        //返回前端
        res.send({
            code: 200,
            msg: "上传成功",
            data: photo
        })

    })
})
// 存到数据库
router.post("/commit", (req, res) => {
    let { workName,
        workSubject,
        startDate,
        endDate,
        teacherName,
        studentName,
        fileurl } = req.body
    commitDB.create({
        workName,
        workSubject,
        startDate,
        endDate,
        teacherName,
        studentName,
        fileurl
    }).then((data) => {
        res.send({
            code: 200,
            msg: "文件存储成功"
        })
    })
})
// 学生端数据库查询
router.post("/search", (req, res) => {
    console.log(req.body);
    let { workName, workSubject, startDate, endDate, teacherName, studentName } = req.body
    // 数据库查找那组数据
    commitDB.findOne({ workName, workSubject, startDate, endDate, teacherName, studentName }
    ).then(data => {
        //返回成功数据
        //向前端发送响应
        res.send({
            code: 200,
            msg: "数据查询成功",
            data
        })
    }).catch(() => {
        res.send({
            code: 500,
            msg: "数据查询失败",
        })
    })
})
// 教师端数据库查询
router.post("/finished", (req, res) => {
    console.log(req.body);

    let { workName, workSubject, teacherName } = req.body
    if (workName && workSubject && teacherName) {
        commitDB.find({ workName, workSubject, teacherName })
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
        commitDB.find({})
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
        commitDB.find({ workName, workSubject })
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
        commitDB.find({ workName })
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
        commitDB.find({ workSubject })
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
        commitDB.find({ teacherName })
            .then(data => {
                // console.log(data);
                res.send({
                    code: 200,
                    msg: "作业查询成功",
                    data
                })
            })

    }
})
// 教师端数据删除
router.delete("/delete",(req,res)=>{
    console.log(req.body);
    let {_id} = req.body

    commitDB.deleteOne({_id})
    .then(data=>{
        res.send({
            code:200,
            msg:"删除成功",
            data
        })
    })

})
module.exports = router
