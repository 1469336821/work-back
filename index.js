const express = require("express");
const mongoose = require("mongoose")
const app = express();
// user表
const userDB = require("./db/user")


app.listen(5555, () => {
    console.log("5555端口监听成功");
})

//连接数据库
require("./middleware/mongoose")
// 跨域
app.use(require("./middleware/cors"))
//session中间件
app.use(require("./middleware/session"))

// 数据处理中间件
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//开放静态资源
app.use(express.static("./public"))

//路由监听
app.use("/",require("./router/index"))

//让路由正常的调回前端路由
app.get("*", (req, res) => {
    res.sendFile(require("path").join(__dirname, "./public/index.html"))
})


