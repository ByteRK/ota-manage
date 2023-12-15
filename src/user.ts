/**
 * 处理用户相关操作
 */

import { STATUSCODE } from "./status";

const dataTable: string = "users";

// 用户登陆
export const login = (db: any, res: any, name: any, pass: any) => {
    if (name == "" || pass == "") {
        res.json({ code: STATUSCODE.ERRORREQ, message: "用户名或密码不能为空", data: {} });
        return;
    }
    const query = `SELECT * FROM ${dataTable} WHERE name = ? AND pass = ?`;  // 防止 SQL 注入
    db.get(query, [name, pass], (err: any, row: any) => {
        if (err) {
            res.json({ code: STATUSCODE.SERVERERROR, message: "服务异常", data: {} });
            return;
        }
        if (row) {
            res.json({ code: STATUSCODE.SUCCESS, message: "登陆成功", data: {} });
        } else {
            res.json({ code: STATUSCODE.NOFIND, message: "账号/密码错误", data: {} });
        }
    });
}

// 增加用户
export const addUser = (db: any, res: any, name: any, pass: any) => {
    res.json({ code: STATUSCODE.ERRORREQ, message: "暂不支持该功能" });
    return;
    if (name == "" || pass == "") {
        res.json({ code: STATUSCODE.ERRORREQ, message: "用户名或密码不能为空", data: {} });
        return;
    }
}
