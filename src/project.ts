/**
 * 处理项目信息操作
 */

import { port, host } from "./config";
import * as send from "./net";
import path from 'path';

const dataTable: string = "apps";

// 获取项目列表
export const getPrjList = (db: any, res: any) => {
    db.all(`SELECT id, code, name, version FROM ${dataTable}`, (err: any, rows: any[]) => {
        if (err) { send._serverError(res); return; }
        if (rows.length == 0) {
            send._error(res, "无项目数据");
        } else {
            send._success(res, "获取项目列表成功", { list: rows });
        }
    });
};

// 获取项目详细信息
export const getPrj = (db: any, req: any, res: any) => {
    const id = req.query.id;
    if (!id) { send._error(res, "请传递项目编号"); return; }

    const query = `SELECT * FROM ${dataTable} WHERE id = ?`;
    db.get(query, [id], (err: any, row: any) => {
        if (err) { send._serverError(res); return; }
        if (row) { send._success(res, "获取成功", { info: row }); }
        else { send._error(res, "无此项目信息"); }
    });
}

// 更新项目信息
export const updatePrj = (db: any, req: any, res: any) => {
    const id = req.body.id ? req.body.id : "";
    const code = req.body.code ? req.body.code : "";
    const name = req.body.name ? req.body.name : "";
    const version = req.body.version ? req.body.version : "";
    if (!id || !code || !name || !version) { send._error(res, "项目信息不完整"); return; }
    if (typeof id !== 'number') { send._error(res, "项目ID必须为数字"); return; }

    const query = `UPDATE ${dataTable} SET code = ?, name = ?, version = ? WHERE id = ?`;
    db.run(query, [code, name, version, id], (err: any) => {
        if (err) { send._serverError(res, "项目信息更新失败，请检查项目信息"); return; }
        else { send._success(res, "项目更新成功", { info: { id: id, code: code, name: name, version: "666" } }); }
    });
}


// 增加项目信息
export const addPrj = (db: any, req: any, res: any) => {
    const id = req.body.id ? req.body.id : "";
    const code = req.body.code ? req.body.code : "";
    const name = req.body.name ? req.body.name : "";
    const version = req.body.version ? req.body.version : "";
    if (!id || !code || !name || !version) { send._error(res, "项目信息不完整"); return; }
    if (typeof id !== 'number') { send._error(res, "项目ID必须为数字"); return; }

    const query = `INSERT INTO ${dataTable} (id, code, name, version) VALUES (?, ?, ?, ?)`;
    db.run(query, [id, code, name, version], (err: any) => {
        if (err) { send._serverError(res, "项目增加失败，请检查项目ID是否重复"); return; }
        else { send._success(res, "项目增加成功"); }
    });
}

// 获取指定项目的版本以及更新链接
export const getVersion = (db: any, req: any, res: any) => {
    // console.log(req);
    const id = req.query.id;
    if (!id) { send._error(res, "请传递项目编号"); return; }

    const query = `SELECT version FROM ${dataTable} WHERE id = ?`;
    db.get(query, [id], (err: any, row: any) => {
        if (err) { send._serverError(res); return; }
        if (row) { send._success(res, "获取成功", { version: row.version, url: `http://${host}:${port}/getPack?id=${id}` }); }
        else { send._error(res, "无此项目信息"); }
    });
}


// 获取指定项目的更新包
export const getPack = (db: any, req: any, res: any) => {
    const id = req.query.id;
    if (!id) { send._error(res, "请传递项目编号"); return; }

    const file = path.join(`./upload/${id}/update.tar.gz`);
    // 提示用户下载文件
    res.download(file, (err: any) => {
        if (err) {
            // 如果出现错误，可以发送一个错误消息或者使用其他方式响应
            console.error("Error:", err);
            if (!res.headersSent) {
                send._error(res, "文件丢失!");
            }
        }
    });
}
