import express from "express";
import multer from "multer";
import path from "path";
import cors from 'cors';
import fs from 'fs';

// 库
const sqlite3 = require("sqlite3").verbose();

// 函数
import { STATUSCODE } from "./status"
import * as userFun from "./user"
import * as prjFun from "./project"


// 检测请求头
function checkHeader(req: any, res: any, next: any) {
    if (/^\/download\//.test(req.path) || req.path === '/login') { return next(); }
    if (req.headers['coffee']) { next(); }
    else { res.json({ code: STATUSCODE.IMRICKEN, message: "拒绝用茶壶冲咖啡!" }); }
}

// 这里可以执行其他操作以清理和关闭应用程序
process.on('uncaughtException', error => {
    console.error(`未捕获的异常：${error.stack}`)
    const logStream = fs.createWriteStream('error.log', { flags: 'a' })
    const timestamp = new Date().toISOString()
    logStream.write(`${timestamp}: Error occurred - ${error.message}\n`)
    // process.exit(1) // 终止应用程序进程
})

// 创建数据库连接
const db = new sqlite3.Database("./database/sanboen-ota.db");
const server = express();
const port = 3007;

server.use(cors()); // 开启跨域访问

// 处理 POST 请求的中间件
server.use(express.json());
server.use(checkHeader);

// 登录验证路由
server.post("/login", (req, res) => {
    console.log(req.headers);
    const { username, password } = req.body;
    userFun.login(db, res, username, password);
});

server.post("/adduser", (req, res) => {
    const { username, password } = req.body;
    userFun.addUser(db, res, username, password);
});

// 处理未监听的URL
server.all("*", (req, res) => {
    prjFun.getPrjList(db, res);
    // res.json({ code: 666, message: "你踏入了新大陆" });
});


// 启动服务器
server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


