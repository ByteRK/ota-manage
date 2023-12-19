"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._serverError = exports._disable = exports._error = exports._success = exports._noSuppect = exports._coofee = exports.mMsg = exports.STATUSCODE = void 0;
var STATUSCODE;
(function (STATUSCODE) {
    STATUSCODE[STATUSCODE["SUCCESS"] = 200] = "SUCCESS";
    STATUSCODE[STATUSCODE["NOFIND"] = 204] = "NOFIND";
    STATUSCODE[STATUSCODE["ERRORREQ"] = 400] = "ERRORREQ";
    STATUSCODE[STATUSCODE["DISABLE"] = 401] = "DISABLE";
    STATUSCODE[STATUSCODE["SERVERERROR"] = 500] = "SERVERERROR";
    STATUSCODE[STATUSCODE["IMRICKEN"] = 418] = "IMRICKEN";
})(STATUSCODE || (exports.STATUSCODE = STATUSCODE = {}));
// 自定义消息
const mMsg = (res, code, msg, data, status = 200) => {
    res.status(status).json({ code: code, message: msg, data: data });
};
exports.mMsg = mMsg;
// 特殊消息
const _coofee = (res) => {
    (0, exports.mMsg)(res, STATUSCODE.IMRICKEN, "拒绝用茶壶冲咖啡!", {});
};
exports._coofee = _coofee;
const _noSuppect = (res) => {
    (0, exports.mMsg)(res, STATUSCODE.ERRORREQ, "暂不支持该功能", {});
};
exports._noSuppect = _noSuppect;
// 根据类型发送消息
const _success = (res, msg, data = {}) => {
    (0, exports.mMsg)(res, STATUSCODE.SUCCESS, msg, data);
};
exports._success = _success;
const _error = (res, msg) => {
    (0, exports.mMsg)(res, STATUSCODE.ERRORREQ, msg, {});
};
exports._error = _error;
const _disable = (res, msg) => {
    (0, exports.mMsg)(res, STATUSCODE.DISABLE, msg, {});
};
exports._disable = _disable;
const _serverError = (res, msg = "服务器异常") => {
    (0, exports.mMsg)(res, STATUSCODE.SERVERERROR, msg, {});
};
exports._serverError = _serverError;
