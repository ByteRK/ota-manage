export enum STATUSCODE {
    SUCCESS = 200,        // 请求成功
    NOFIND = 204,         // 无内容
    ERRORREQ = 400,       // 错误请求
    DISABLE = 401,        // 无权限
    SERVERERROR = 500,    // 服务器内部错误

    IMRICKEN = 418,       // 拒绝用茶壶冲咖啡
}