"use strict";
/**
 * 处理网络请求
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
exports.reqDeal = void 0;
const send = __importStar(require("./net"));
// 操作函数
const userFun = __importStar(require("./user"));
const prjFun = __importStar(require("./project"));
// 处理支持多种类型的请求
const dealMoreSupport = (db, req, res) => {
    switch (req.path) {
        case "/login":
            {
                userFun.login(db, req, res);
            }
            return true;
        case "/adduser":
            {
                userFun.addUser(db, req, res);
            }
            return true;
        default:
            return false;
    }
    ;
};
// 处理未处理的Post请求
const dealPost = (db, req, res) => {
    switch (req.path) {
        case "/addPrj":
            prjFun.addPrj(db, req, res);
            return;
        default:
            send._coofee(res);
            break;
    }
};
// 处理未处理的Get请求
const dealGet = (db, req, res) => {
    switch (req.path) {
        case "/prjList":
            prjFun.getPrjList(db, res);
            return;
        case "/prjInfo":
            prjFun.getPrj(db, req, res);
            return;
        case "/getVersion":
            prjFun.getVersion(db, req, res);
            return;
        default:
            send._coofee(res);
            break;
    }
};
// 拆分请求类型
const reqDeal = (db, req, res) => {
    if (dealMoreSupport(db, req, res))
        return;
    if (req.method === 'POST') {
        dealPost(db, req, res);
    }
    else if (req.method === 'GET') {
        dealGet(db, req, res);
    }
    else {
        send._coofee(res);
    }
};
exports.reqDeal = reqDeal;
