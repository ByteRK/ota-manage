import express from "express";
import multer from "multer";
import path from "path";
import cors from 'cors';
import fs from 'fs';

import * as send from "./net";
import { uploadCheck, upload } from "./upload";
import { reqDeal } from "./request";

// 异常捕获
process.on('uncaughtException', error => {
    console.error(`未捕获的异常：${error.stack}`)
    const logStream = fs.createWriteStream('error.log', { flags: 'a' })
    const timestamp = new Date().toISOString()
    logStream.write(`${timestamp}: Error occurred - ${error.message}\n`)
    // process.exit(1) // 终止应用程序进程
})

function skipCheck(req: any) {
    // if (/^\/download\//.test(req.url)) return true;
    if (req.path === "/download") return true;
    if (req.path === "/login") return true;

    if (req.path === "/getVersion") return true;
    if (req.path === "/getPack") return true;
    return false;
}

// 请求预检查
function checkRequest(req: any, res: any, next: any) {
    if (skipCheck(req)) { next(); return; }
    if (req.path === "/upload") {
        if (uploadCheck(req, res)) next();
        return;
    };
    if (req.headers['coffee']) { next(); }
    else { send._coofee(res); }
}

// 创建数据库连接
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/sanboen-ota.db");

// 配置服务器信息
const server = express();
const port = 3007;

// 处理 POST 请求的中间件
server.use(cors());            // 开启跨域访问
server.use(express.json());    // 使用JSON
server.use(checkRequest)       // 处理请求前对请求进行检查

// 处理文件上传的路由
server.post('/upload', upload.single('file'), (req: any, res: any) => {
    // console.log(req);
    send._success(res, "上传成功", {});
});

// 所有请求交给reqDeal处理
server.all("*", (req, res) => { reqDeal(db, req, res); });

// 启动服务器
server.listen(port, () => { console.log(`Server listening at http://localhost:${port}`); });