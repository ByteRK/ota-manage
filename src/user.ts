/**
 * 处理用户相关操作
 */

// 引入方法
import { URL } from 'url';
import * as send from "./net";


// 定义所使用的表
const dataTable: string = "users";


const getNameAndPass = (req: any) => {
    let username: string, password: string;
    if (req.method == "POST") {
        // console.log(req.body)
        username = req.body.username ? req.body.username : "";
        password = req.body.password ? req.body.password : "";
    } else if (req.method == "GET") {
        // console.log(req.query)
        username = req.query.username ? req.query.username : "";
        password = req.query.password ? req.query.password : "";
    }
    return { username, password };
}


// 用户登陆
export const login = (db: any, req: any, res: any) => {
    const { username, password } = getNameAndPass(req)
    if (!username || !password) { send._error(res, "用户名或密码不能为空"); return; }

    const query = `SELECT * FROM ${dataTable} WHERE name = ? AND pass = ?`;  // 防止 SQL 注入
    db.get(query, [username, password], (err: any, row: any) => {
        if (err) { send._serverError(res); return; }

        if (row) { send._success(res, "登陆成功"); }
        else { send._error(res, "账号/密码错误"); }
    });
}

// 增加用户
export const addUser = (db: any, req: any, res: any) => {
    send._noSuppect(res);
    return;
    const { username, password } = getNameAndPass(req)
    if (username == "" || password == "") {
        send._error(res, "用户名或密码不能为空"); return;
    }
}
