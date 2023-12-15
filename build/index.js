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
// 库
const sqlite3 = require("sqlite3").verbose();
// 函数
const status_1 = require("./status");
const userFun = __importStar(require("./user"));
const prjFun = __importStar(require("./project"));
// 检测请求头
function checkHeader(req, res, next) {
    if (/^\/download\//.test(req.path) || req.path === '/login') {
        return next();
    }
    if (req.headers['coffee']) {
        next();
    }
    else {
        res.json({ code: status_1.STATUSCODE.IMRICKEN, message: "拒绝用茶壶冲咖啡!" });
    }
}
// 这里可以执行其他操作以清理和关闭应用程序
process.on('uncaughtException', error => {
    console.error(`未捕获的异常：${error.stack}`);
    const logStream = fs_1.default.createWriteStream('error.log', { flags: 'a' });
    const timestamp = new Date().toISOString();
    logStream.write(`${timestamp}: Error occurred - ${error.message}\n`);
    // process.exit(1) // 终止应用程序进程
});
// 创建数据库连接
const db = new sqlite3.Database("./database/sanboen-ota.db");
const server = (0, express_1.default)();
const port = 3007;
server.use((0, cors_1.default)()); // 开启跨域访问
// 处理 POST 请求的中间件
server.use(express_1.default.json());
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
