"use strict";
/**
 * 处理用户相关操作
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.login = void 0;
const send = __importStar(require("./net"));
// 定义所使用的表
const dataTable = "users";
const getNameAndPass = (req) => {
    let username, password;
    if (req.method == "POST") {
        // console.log(req.body)
        username = req.body.username ? req.body.username : "";
        password = req.body.password ? req.body.password : "";
    }
    else if (req.method == "GET") {
        // console.log(req.query)
        username = req.query.username ? req.query.username : "";
        password = req.query.password ? req.query.password : "";
    }
    return { username, password };
};
// 用户登陆
const login = (db, req, res) => {
    const { username, password } = getNameAndPass(req);
    if (!username || !password) {
        send._error(res, "用户名或密码不能为空");
        return;
    }
    const query = `SELECT * FROM ${dataTable} WHERE name = ? AND pass = ?`; // 防止 SQL 注入
    db.get(query, [username, password], (err, row) => {
        if (err) {
            send._serverError(res);
            return;
        }
        if (row) {
            send._success(res, "登陆成功");
        }
        else {
            send._error(res, "账号/密码错误");
        }
    });
};
exports.login = login;
// 增加用户
const addUser = (db, req, res) => {
    send._noSuppect(res);
    return;
    const { username, password } = getNameAndPass(req);
    if (username == "" || password == "") {
        send._error(res, "用户名或密码不能为空");
        return;
    }
};
exports.addUser = addUser;
