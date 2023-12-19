"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNullMsg = exports.sendNoSuppect = exports.sendCoofee = exports.STATUSCODE = void 0;
var STATUSCODE;
(function (STATUSCODE) {
    STATUSCODE[STATUSCODE["SUCCESS"] = 200] = "SUCCESS";
    STATUSCODE[STATUSCODE["NOFIND"] = 204] = "NOFIND";
    STATUSCODE[STATUSCODE["ERRORREQ"] = 400] = "ERRORREQ";
    STATUSCODE[STATUSCODE["DISABLE"] = 401] = "DISABLE";
    STATUSCODE[STATUSCODE["SERVERERROR"] = 500] = "SERVERERROR";
    STATUSCODE[STATUSCODE["IMRICKEN"] = 418] = "IMRICKEN";
})(STATUSCODE || (exports.STATUSCODE = STATUSCODE = {}));
const sendCoofee = (res) => { res.json({ code: STATUSCODE.IMRICKEN, message: "拒绝用茶壶冲咖啡!" }); };
exports.sendCoofee = sendCoofee;
const sendNoSuppect = (res) => { res.json({ code: STATUSCODE.ERRORREQ, message: "暂不支持该功能" }); };
exports.sendNoSuppect = sendNoSuppect;
const sendNullMsg = (res, code, msg) => { res.json({ code: code, msg }); };
exports.sendNullMsg = sendNullMsg;
