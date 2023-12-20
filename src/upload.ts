/**
 * 处理新OTA包操作
 */

import fs from 'fs';
import multer from 'multer';
import { _error } from './net'

const uploadDir = 'upload';

export const uploadCheck = (req: any, res: any) => {
    if (!req.query.id) { _error(res, "缺少项目ID"); return false; }
    return true;
};

function checkDir(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    } else {
        if (!fs.statSync(dir).isDirectory()) {
            fs.unlinkSync(dir);
            fs.mkdirSync(dir);
        }
    }
    return dir;
}

// 创建文件夹
checkDir(uploadDir);

// 根据请求头中的信息确定文件保存位置
function determineSavePath(query: any) {
    checkDir(uploadDir);
    return checkDir(uploadDir + '/' + query.id);
}

// 为上传的文件生成新的文件名
function generateFilename(file: any) {
    return "update.tar.gz";
}

// 配置 multer 中间件
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        const savePath = determineSavePath(req.query);
        // console.log(savePath);
        cb(null, savePath);
    },
    filename: (req: any, file: any, cb: any) => {
        const filename = generateFilename(file);
        // console.log(filename);
        cb(null, filename);
    },
});

export const upload = multer({ storage });