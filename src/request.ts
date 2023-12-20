/**
 * 处理网络请求
 */

import * as send from "./net"

// 操作函数
import * as userFun from "./user"
import * as prjFun from "./project"


// 处理支持多种类型的请求
const dealMoreSupport = (db: any, req: any, res: any) => {
    switch (req.path) {
        case "/login": {
            userFun.login(db, req, res);
        } return true;
        case "/adduser": {
            userFun.addUser(db, req, res);
        } return true;

        default:
            return false;
    };
}


// 处理未处理的Post请求
const dealPost = (db: any, req: any, res: any) => {
    switch (req.path) {
        case "/updatePrj":
            prjFun.updatePrj(db, req, res);
            return;
        case "/addPrj":
            prjFun.addPrj(db, req, res);
            return;
        default:
            send._coofee(res);
            break;
    }
}


// 处理未处理的Get请求
const dealGet = (db: any, req: any, res: any) => {
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
        case "/getPack":
            prjFun.getPack(db, req, res);
            return;
        default:
            send._coofee(res);
            break;
    }
}


// 拆分请求类型
export const reqDeal = (db: any, req: any, res: any) => {
    if (dealMoreSupport(db, req, res)) return;
    if (req.method === 'POST') {
        dealPost(db, req, res);
    } else if (req.method === 'GET') {
        dealGet(db, req, res);
    } else {
        send._coofee(res);
    }
}