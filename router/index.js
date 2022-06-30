const express = require("express")
const router = express.Router()
//注册路由监听
router.use("/reg", require("./reg/index"))
//登录
router.use("/login", require("./login/index"))
//个人信息修改
router.use("/personal", require("./personal/index"))
//学生提交作业
router.use("/commitwork", require("./commitwork/index"))
//老师作业发布
router.use("/addwork", require("./addwork/index"))
//老师修改作业
router.use("/update", require("./update/index"))
//查询作业发布
router.use("/searchwork", require("./searchwork/index"))
//删除作业
router.use("/remove", require("./remove/index"))

module.exports = router