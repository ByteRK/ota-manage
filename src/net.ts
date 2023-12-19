export enum STATUSCODE {
    SUCCESS = 200,        // 请求成功
    NOFIND = 204,         // 无内容
    ERRORREQ = 400,       // 错误请求
    DISABLE = 401,        // 无权限
    SERVERERROR = 500,    // 服务器内部错误

    IMRICKEN = 418,       // 拒绝用茶壶冲咖啡
}

// 自定义消息
export const mMsg = (res: any, code: STATUSCODE, msg: any, data: any, status: number = 200) => {
    res.status(status).json({ code: code, message: msg, data: data });
};


// 特殊消息
export const _coofee = (res: any) => {
    mMsg(res, STATUSCODE.IMRICKEN, "拒绝用茶壶冲咖啡!", {});
};
export const _noSuppect = (res: any) => {
    mMsg(res, STATUSCODE.ERRORREQ, "暂不支持该功能", {});
};


// 根据类型发送消息
export const _success = (res: any, msg: any, data: any = {}) => {
    mMsg(res, STATUSCODE.SUCCESS, msg, data);
};
export const _error = (res: any, msg: any) => {
    mMsg(res, STATUSCODE.ERRORREQ, msg, {});
};
export const _disable = (res: any, msg: any) => {
    mMsg(res, STATUSCODE.DISABLE, msg, {});
};
export const _serverError = (res: any, msg: any = "服务器异常") => {
    mMsg(res, STATUSCODE.SERVERERROR, msg, {})
};
