/**
 * 处理项目信息操作
 */

import * as send from "./net";

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

// 增加项目信息
export const addPrj = (db: any, req: any, res: any) => {
    const id = req.body.id ? req.body.id : "";
    const code = req.body.code ? req.body.code : "";
    const name = req.body.name ? req.body.name : "";
    const version = req.body.version ? req.body.version : "";
    if (!id || !code || !name || !version) { send._error(res, "项目信息不完整"); return; }

    const query = `INSERT INTO ${dataTable} (id, code, name, version) VALUES (?, ?, ?, ?);`;
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
        if (row) { send._success(res, "获取成功", { version: row.version, url: `${req.baseUrl}/getPack/${id}/update.tar.gz` }); }
        else { send._error(res, "无此项目信息"); }
    });
}

