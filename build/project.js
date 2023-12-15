"use strict";
/**
 * 处理项目信息操作
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrjList = void 0;
const status_1 = require("./status");
const dataTable = "apps";
// 获取项目列表
const getPrjList = (db, res) => {
    db.all(`SELECT id, name, version FROM ${dataTable}`, (err, rows) => {
        if (err) {
            res.json({ code: status_1.STATUSCODE.SERVERERROR, message: "服务异常", data: {} });
        }
        if (rows.length == 0) {
            res.json({ code: status_1.STATUSCODE.NOFIND, message: "无数据", data: {} });
        }
        else {
            res.json({ code: status_1.STATUSCODE.SUCCESS, message: "获取成功", data: { rows: rows } });
        }
    });
};
exports.getPrjList = getPrjList;
