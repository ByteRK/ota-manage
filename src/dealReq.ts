/**
 * 处理网络请求
 */

// 状态枚举
import { STATUSCODE } from "./status"

const showCoofee = (res: any) => { res.json({ code: STATUSCODE.IMRICKEN, message: "拒绝用茶壶冲咖啡!" }); };

const dealNewPacket = (req: any, res: any) => {

}


const dealPost = (req: any, res: any) => {
    switch (req.url) {
        case "/login":

            break;

        default:
            showCoofee(res);
            break;
    }
}


const dealGet = (req: any, res: any) => {
    switch (req.url) {
        case "/login":

            break;

        default:
            showCoofee(res);
            break;
    }
}


export const deal = (req: any, res: any) => {
    if (req.method === 'POST') {
        
    } else if (req.method === 'GET') {
        dealGet(req, res);
    } else {
        showCoofee(res);
    }
}