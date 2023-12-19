"use strict";
/**
 * 处理网络请求
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deal = void 0;
// 状态枚举
const status_1 = require("./status");
const sendCoofee = (res) => { res.json({ code: status_1.STATUSCODE.IMRICKEN, message: "拒绝用茶壶冲咖啡!" }); };
const dealNewPacket = (req, res) => {
};
const dealPost = (req, res) => {
    switch (req.url) {
        case "/login":
            break;
        default:
            sendCoofee(res);
            break;
    }
};
const dealGet = (req, res) => {
    switch (req.url) {
        case "/login":
            break;
        default:
            sendCoofee(res);
            break;
    }
};
const deal = (req, res) => {
    if (req.method === 'POST') {
    }
    else if (req.method === 'GET') {
        dealGet(req, res);
    }
    else {
        sendCoofee(res);
    }
};
exports.deal = deal;
