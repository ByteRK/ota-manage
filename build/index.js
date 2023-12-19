"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const send = __importStar(require("./net"));
const upload_1 = require("./upload");
const request_1 = require("./request");
// 异常捕获
process.on('uncaughtException', error => {
    console.error(`未捕获的异常：${error.stack}`);
    const logStream = fs_1.default.createWriteStream('error.log', { flags: 'a' });
    const timestamp = new Date().toISOString();
    logStream.write(`${timestamp}: Error occurred - ${error.message}\n`);
    // process.exit(1) // 终止应用程序进程
});
function skipCheck(req) {
    // if (/^\/download\//.test(req.url)) return true;
    if (req.path === "/download")
        return true;
    if (req.path === "/login")
        return true;
    if (req.path === "/getVersion")
        return true;
    if (req.path === "/getPack")
        return true;
    return false;
}
// 请求预检查
function checkRequest(req, res, next) {
    if (skipCheck(req)) {
        next();
        return;
    }
    if (req.path === "/upload") {
        if ((0, upload_1.uploadCheck)(req, res))
            next();
        return;
    }
    ;
    if (req.headers['coffee']) {
        next();
    }
    else {
        send._coofee(res);
    }
}
// 创建数据库连接
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/sanboen-ota.db");
// 配置服务器信息
const server = (0, express_1.default)();
const port = 3007;
// 处理 POST 请求的中间件
server.use((0, cors_1.default)()); // 开启跨域访问
server.use(express_1.default.json()); // 使用JSON
server.use(checkRequest); // 处理请求前对请求进行检查
// 处理文件上传的路由
server.post('/upload', upload_1.upload.single('file'), (req, res) => {
    // console.log(req);
    send._success(res, "上传成功", {});
});
// 所有请求交给reqDeal处理
server.all("*", (req, res) => { (0, request_1.reqDeal)(db, req, res); });
// 启动服务器
server.listen(port, () => { console.log(`Server listening at http://localhost:${port}`); });
