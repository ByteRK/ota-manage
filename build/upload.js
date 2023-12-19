"use strict";
/**
 * 处理新OTA包操作
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadCheck = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const net_1 = require("./net");
const uploadDir = 'upload';
const uploadCheck = (req, res) => {
    if (!req.query.id) {
        (0, net_1._error)(res, "缺少项目ID");
        return false;
    }
    return true;
};
exports.uploadCheck = uploadCheck;
function checkDir(dir) {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir);
    }
    else {
        if (!fs_1.default.statSync(dir).isDirectory()) {
            fs_1.default.unlinkSync(dir);
            fs_1.default.mkdirSync(dir);
        }
    }
    return dir;
}
// 创建文件夹
checkDir(uploadDir);
// 根据请求头中的信息确定文件保存位置
function determineSavePath(query) {
    checkDir(uploadDir);
    return checkDir(uploadDir + '/' + query.id);
}
// 为上传的文件生成新的文件名
function generateFilename(file) {
    return "update.tar.gz";
}
// 配置 multer 中间件
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const savePath = determineSavePath(req.query);
        console.log(savePath);
        cb(null, savePath);
    },
    filename: (req, file, cb) => {
        const filename = generateFilename(file);
        console.log(filename);
        cb(null, filename);
    },
});
exports.upload = (0, multer_1.default)({ storage });
