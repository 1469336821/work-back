const mongoose = require("mongoose")

//连接数据库
mongoose.connect("mongodb://localhost:27017/homework", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then(() => {
    console.log("数据库连接成功");
}).catch(e => {
    console.log("数据库连接失败", e);
})