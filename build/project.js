"use strict";
/**
 * 处理项目信息操作
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPack = exports.getVersion = exports.addPrj = exports.updatePrj = exports.getPrj = exports.getPrjList = void 0;
const config_1 = require("./config");
const send = __importStar(require("./net"));
const path_1 = __importDefault(require("path"));
const dataTable = "apps";
// 获取项目列表
const getPrjList = (db, res) => {
    db.all(`SELECT id, code, name, version FROM ${dataTable}`, (err, rows) => {
        if (err) {
            send._serverError(res);
            return;
        }
        if (rows.length == 0) {
            send._error(res, "无项目数据");
        }
        else {
            send._success(res, "获取项目列表成功", { list: rows });
        }
    });
};
exports.getPrjList = getPrjList;
// 获取项目详细信息
const getPrj = (db, req, res) => {
    const id = req.query.id;
    if (!id) {
        send._error(res, "请传递项目编号");
        return;
    }
    const query = `SELECT * FROM ${dataTable} WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        if (err) {
            send._serverError(res);
            return;
        }
        if (row) {
            send._success(res, "获取成功", { info: row });
        }
        else {
            send._error(res, "无此项目信息");
        }
    });
};
exports.getPrj = getPrj;
// 更新项目信息
const updatePrj = (db, req, res) => {
    const id = req.body.id ? req.body.id : "";
    const code = req.body.code ? req.body.code : "";
    const name = req.body.name ? req.body.name : "";
    const version = req.body.version ? req.body.version : "";
    if (!id || !code || !name || !version) {
        send._error(res, "项目信息不完整");
        return;
    }
    if (typeof id !== 'number') {
        send._error(res, "项目ID必须为数字");
        return;
    }
    const query = `UPDATE ${dataTable} SET code = ?, name = ?, version = ? WHERE id = ?`;
    db.run(query, [code, name, version, id], (err) => {
        if (err) {
            send._serverError(res, "项目信息更新失败，请检查项目信息");
            return;
        }
        else {
            send._success(res, "项目更新成功", { info: { id: id, code: code, name: name, version: "666" } });
        }
    });
};
exports.updatePrj = updatePrj;
// 增加项目信息
const addPrj = (db, req, res) => {
    const id = req.body.id ? req.body.id : "";
    const code = req.body.code ? req.body.code : "";
    const name = req.body.name ? req.body.name : "";
    const version = req.body.version ? req.body.version : "";
    if (!id || !code || !name || !version) {
        send._error(res, "项目信息不完整");
        return;
    }
    if (typeof id !== 'number') {
        send._error(res, "项目ID必须为数字");
        return;
    }
    const query = `INSERT INTO ${dataTable} (id, code, name, version) VALUES (?, ?, ?, ?)`;
    db.run(query, [id, code, name, version], (err) => {
        if (err) {
            send._serverError(res, "项目增加失败，请检查项目ID是否重复");
            return;
        }
        else {
            send._success(res, "项目增加成功");
        }
    });
};
exports.addPrj = addPrj;
// 获取指定项目的版本以及更新链接
const getVersion = (db, req, res) => {
    // console.log(req);
    const id = req.query.id;
    if (!id) {
        send._error(res, "请传递项目编号");
        return;
    }
    const query = `SELECT version FROM ${dataTable} WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        if (err) {
            send._serverError(res);
            return;
        }
        if (row) {
            send._success(res, "获取成功", { version: row.version, url: `http://${config_1.host}:${config_1.port}/getPack?id=${id}` });
        }
        else {
            send._error(res, "无此项目信息");
        }
    });
};
exports.getVersion = getVersion;
// 获取指定项目的更新包
const getPack = (db, req, res) => {
    const id = req.query.id;
    if (!id) {
        send._error(res, "请传递项目编号");
        return;
    }
    const file = path_1.default.join(`./upload/${id}/update.tar.gz`);
    // 提示用户下载文件
    res.download(file, (err) => {
        if (err) {
            // 如果出现错误，可以发送一个错误消息或者使用其他方式响应
            console.error("Error:", err);
            if (!res.headersSent) {
                send._error(res, "文件丢失!");
            }
        }
    });
};
exports.getPack = getPack;
