"use strict";
/**
 * 处理用户相关操作
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.login = void 0;
const status_1 = require("./status");
const dataTable = "users";
// 用户登陆
const login = (db, res, name, pass) => {
    if (name == "" || pass == "") {
        res.json({ code: status_1.STATUSCODE.ERRORREQ, message: "用户名或密码不能为空", data: {} });
        return;
    }
    const query = `SELECT * FROM ${dataTable} WHERE name = ? AND pass = ?`; // 防止 SQL 注入
    db.get(query, [name, pass], (err, row) => {
        if (err) {
            res.json({ code: status_1.STATUSCODE.SERVERERROR, message: "服务异常", data: {} });
            return;
        }
        if (row) {
            res.json({ code: status_1.STATUSCODE.SUCCESS, message: "登陆成功", data: {} });
        }
        else {
            res.json({ code: status_1.STATUSCODE.NOFIND, message: "账号/密码错误", data: {} });
        }
    });
};
exports.login = login;
// 增加用户
const addUser = (db, res, name, pass) => {
    res.json({ code: status_1.STATUSCODE.ERRORREQ, message: "暂不支持该功能" });
    return;
    if (name == "" || pass == "") {
        res.json({ code: status_1.STATUSCODE.ERRORREQ, message: "用户名或密码不能为空", data: {} });
        return;
    }
};
exports.addUser = addUser;
