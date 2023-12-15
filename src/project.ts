/**
 * 处理项目信息操作
 */

import { STATUSCODE } from "./status";

const dataTable: string = "apps";

// 获取项目列表
export const getPrjList = (db: any, res: any) => {
    db.all(`SELECT id, name, version FROM ${dataTable}`, (err: any, rows: any[]) => {
        if (err) {
            res.json({ code: STATUSCODE.SERVERERROR, message: "服务异常", data: {} });
        }
        if (rows.length == 0) {
            res.json({ code: STATUSCODE.NOFIND, message: "无数据", data: {} });
        } else {
            res.json({ code: STATUSCODE.SUCCESS, message: "获取成功", data: { rows: rows } });
        }
    });
};

